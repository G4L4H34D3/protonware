import { WebSocket } from 'isomorphic-ws';
import { ENV } from '../../config/env';
import { serializeError } from './utils';

export class BinanceWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = ENV.MAX_RETRIES;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(
    private readonly url: string,
    private readonly onMessage: (data: any) => void,
    private readonly onError?: (error: Error) => void
  ) {}

  connect(): void {
    try {
      this.cleanup();
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.setupPing();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          this.onMessage(data);
        } catch (error) {
          this.handleError(new Error(`WebSocket message parse error: ${serializeError(error)}`));
        }
      };

      this.ws.onerror = (error) => {
        this.handleError(new Error(`WebSocket error: ${serializeError(error)}`));
      };

      this.ws.onclose = () => {
        this.cleanup();
        this.handleReconnect();
      };
    } catch (error) {
      this.handleError(new Error(`WebSocket connection error: ${serializeError(error)}`));
    }
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  private handleError(error: Error): void {
    this.onError?.(error);
    this.handleReconnect();
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, delay);
    }
  }

  private cleanup(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  disconnect(): void {
    this.cleanup();
  }
}