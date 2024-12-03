import { ExchangeAPI, PriceData, ExchangeCredentials } from './types';
import WebSocket from 'isomorphic-ws';
import { binanceApi } from '../api/config';

export class BinanceAPI implements ExchangeAPI {
  private ws: WebSocket | null = null;
  private callbacks: Map<string, ((price: PriceData) => void)[]> = new Map();
  private credentials: ExchangeCredentials;

  constructor(credentials: ExchangeCredentials) {
    this.credentials = credentials;
  }

  getName(): string {
    return 'Binance';
  }

  async getPrice(symbol: string): Promise<PriceData> {
    try {
      const response = await binanceApi.get(`/api/v3/ticker/bookTicker`, {
        params: { symbol }
      });
      
      return {
        symbol,
        bid: parseFloat(response.data.bidPrice),
        ask: parseFloat(response.data.askPrice),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error fetching Binance price:', error);
      throw error;
    }
  }

  subscribeToPrice(symbol: string, callback: (price: PriceData) => void): void {
    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, []);
    }
    this.callbacks.get(symbol)?.push(callback);

    if (!this.ws) {
      this.ws = new WebSocket('wss://stream.binance.com:9443/ws');
      
      this.ws.onopen = () => {
        const symbols = Array.from(this.callbacks.keys());
        const subscribeMsg = {
          method: 'SUBSCRIBE',
          params: symbols.map(s => `${s.toLowerCase()}@bookTicker`),
          id: 1
        };
        this.ws.send(JSON.stringify(subscribeMsg));
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data as string);
        if (data.s) { // Valid book ticker data
          const priceData: PriceData = {
            symbol: data.s,
            bid: parseFloat(data.b),
            ask: parseFloat(data.a),
            timestamp: Date.now()
          };
          this.callbacks.get(data.s)?.forEach(cb => cb(priceData));
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  unsubscribeFromPrice(symbol: string): void {
    this.callbacks.delete(symbol);
    if (this.ws && this.callbacks.size === 0) {
      this.ws.close();
      this.ws = null;
    }
  }
}