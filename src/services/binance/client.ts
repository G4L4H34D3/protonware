import { ENV } from '../../config/env';
import { BinanceAPI } from './api';
import { BinanceWebSocket } from './websocket';
import { serializeError } from './utils';
import { OrderBook } from '../../types/orderBook';
import { logger } from './logger';

export class BinanceClient {
  private readonly api: BinanceAPI;
  private ws: BinanceWebSocket | null = null;
  private listenKey: string | null = null;
  private keepAliveInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.api = new BinanceAPI({
      apiKey: ENV.BINANCE_API_KEY,
      apiSecret: ENV.BINANCE_API_SECRET
    });
  }

  async getOrderBook(symbol: string): Promise<OrderBook> {
    try {
      const response = await this.api.request('/api/v3/depth', 'GET', {
        symbol,
        limit: '20'
      }, false);

      // Transform the response into our OrderBook type
      const bids = response.bids.map(([price, quantity]: string[]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        liquidity: parseFloat(price) * parseFloat(quantity)
      }));

      const asks = response.asks.map(([price, quantity]: string[]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        liquidity: parseFloat(price) * parseFloat(quantity)
      }));

      const totalBidLiquidity = bids.reduce((sum, bid) => sum + bid.liquidity, 0);
      const totalAskLiquidity = asks.reduce((sum, ask) => sum + ask.liquidity, 0);

      return {
        symbol,
        exchange: 'binance',
        bids,
        asks,
        timestamp: Date.now(),
        totalBidLiquidity,
        totalAskLiquidity
      };
    } catch (error) {
      logger.error('Failed to get order book', { error });
      throw new Error(`Failed to get order book: ${serializeError(error)}`);
    }
  }

  async subscribeToUserData(callback: (data: any) => void): Promise<void> {
    try {
      if (!this.listenKey) {
        const response = await this.api.createListenKey();
        this.listenKey = response.listenKey;
      }

      if (!this.ws && this.listenKey) {
        const wsUrl = `${ENV.BINANCE_WS_URL}/ws/${this.listenKey}`;
        this.ws = new BinanceWebSocket(
          wsUrl,
          callback,
          (error) => logger.error('WebSocket error', { error })
        );
        this.ws.connect();

        // Keep listen key alive
        this.keepAliveInterval = setInterval(async () => {
          try {
            if (this.listenKey) {
              await this.api.keepAliveListenKey(this.listenKey);
            }
          } catch (error) {
            logger.error('Failed to keep listen key alive', { error });
            await this.reconnect();
          }
        }, 30 * 60 * 1000); // 30 minutes
      }
    } catch (error) {
      logger.error('Failed to subscribe to user data', { error });
      throw error;
    }
  }

  private async reconnect(): Promise<void> {
    try {
      this.cleanup();
      await this.subscribeToUserData((data) => {
        logger.debug('Received user data', { data });
      });
    } catch (error) {
      logger.error('Failed to reconnect', { error });
    }
  }

  private cleanup(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }

    if (this.ws) {
      this.ws.disconnect();
      this.ws = null;
    }

    this.listenKey = null;
  }

  async unsubscribeFromUserData(): Promise<void> {
    try {
      if (this.listenKey) {
        await this.api.deleteListenKey(this.listenKey);
      }
    } catch (error) {
      logger.error('Failed to delete listen key', { error });
    } finally {
      this.cleanup();
    }
  }
}