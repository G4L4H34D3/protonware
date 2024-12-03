import axios, { AxiosError } from 'axios';
import { ENV } from '../../config/env';
import { WebSocketManager } from '../websocket/WebSocketManager';
import { logger } from './logger';

export class BinanceClient {
  private wsManager: WebSocketManager | null = null;
  private listenKey: string | null = null;
  private keepAliveInterval: NodeJS.Timeout | null = null;

  private async makeRequest(endpoint: string, method: string = 'GET', params: any = {}, signed: boolean = true) {
    try {
      const timestamp = Date.now();
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });

      const config = {
        method,
        url: `${ENV.BINANCE_API_URL}${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
        headers: {
          'X-MBX-APIKEY': ENV.BINANCE_API_KEY,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof AxiosError ? error.response?.data?.msg || error.message : 'Unknown error';
      logger.error('Binance API request failed', { endpoint, error: errorMessage });
      throw error;
    }
  }

  async getAccountInfo() {
    try {
      // Mock response for development
      return {
        balances: [
          {
            asset: 'BTC',
            free: '0.5',
            locked: '0'
          },
          {
            asset: 'ETH',
            free: '10',
            locked: '0'
          }
        ]
      };
    } catch (error) {
      logger.error('Failed to get account info', { error });
      return { balances: [] };
    }
  }

  async getTickerPrice(symbol?: string) {
    try {
      // Mock response for development
      return [
        {
          symbol: 'BTCUSDT',
          price: '45000'
        },
        {
          symbol: 'ETHUSDT',
          price: '3000'
        }
      ];
    } catch (error) {
      logger.error('Failed to get ticker price', { error });
      return [];
    }
  }

  async get24hrTicker(symbol?: string) {
    try {
      // Mock response for development
      return [
        {
          symbol: 'BTCUSDT',
          priceChangePercent: '2.5'
        },
        {
          symbol: 'ETHUSDT',
          priceChangePercent: '3.2'
        }
      ];
    } catch (error) {
      logger.error('Failed to get 24hr ticker', { error });
      return [];
    }
  }

  async subscribeToUserData(callback: (data: any) => void): Promise<void> {
    try {
      // Mock WebSocket connection for development
      const mockData = {
        e: 'outboundAccountPosition',
        balances: [
          {
            asset: 'BTC',
            free: '0.5',
            locked: '0'
          }
        ]
      };

      // Simulate periodic updates
      setInterval(() => {
        callback(mockData);
      }, 5000);

    } catch (error) {
      logger.error('Failed to subscribe to user data', { error });
    }
  }

  unsubscribeFromUserData(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }

    if (this.wsManager) {
      this.wsManager.disconnect();
      this.wsManager = null;
    }

    this.listenKey = null;
  }
}