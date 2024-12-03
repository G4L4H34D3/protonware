import { ExchangeAPI, PriceData, ExchangeCredentials } from './types';
import WebSocket from 'isomorphic-ws';

export class FoxbitAPI implements ExchangeAPI {
  private ws: WebSocket | null = null;
  private callbacks: Map<string, ((price: PriceData) => void)[]> = new Map();
  private credentials: ExchangeCredentials;

  constructor(credentials: ExchangeCredentials) {
    this.credentials = credentials;
  }

  getName(): string {
    return 'Foxbit';
  }

  async getPrice(symbol: string): Promise<PriceData> {
    try {
      const response = await fetch(`https://api.foxbit.com.br/api/v1/market/ticker/${symbol}`);
      const data = await response.json();
      return {
        symbol,
        bid: parseFloat(data.bid),
        ask: parseFloat(data.ask),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error fetching Foxbit price:', error);
      throw error;
    }
  }

  subscribeToPrice(symbol: string, callback: (price: PriceData) => void): void {
    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, []);
    }
    this.callbacks.get(symbol)?.push(callback);

    if (!this.ws) {
      this.ws = new WebSocket('wss://api.foxbit.com.br/ws/v1');

      this.ws.onopen = () => {
        const symbols = Array.from(this.callbacks.keys());
        symbols.forEach(symbol => {
          const subscribeMsg = {
            type: 'subscribe',
            channel: `ticker_${symbol.toLowerCase()}`,
            auth: {
              apiKey: this.credentials.apiKey,
              apiSecret: this.credentials.apiSecret
            }
          };
          this.ws.send(JSON.stringify(subscribeMsg));
        });
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data as string);
        if (data.type === 'ticker') {
          const priceData: PriceData = {
            symbol: data.symbol,
            bid: parseFloat(data.bid),
            ask: parseFloat(data.ask),
            timestamp: Date.now()
          };
          this.callbacks.get(data.symbol)?.forEach(cb => cb(priceData));
        }
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