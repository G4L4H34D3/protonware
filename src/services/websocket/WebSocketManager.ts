import WebSocket from 'isomorphic-ws';
import { ENV } from '../../config/env';

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = ENV.MAX_RETRIES;
  private onMessageCallback?: (data: any) => void;
  private onCloseCallback?: () => void;
  private reconnectTimeout?: NodeJS.Timeout;
  private pingInterval?: NodeJS.Timeout;
  private isConnecting: boolean = false;

  constructor(url: string) {
    this.url = url;
  }

  connect(onMessage: (data: any) => void): void {
    if (this.isConnecting) return;
    
    this.onMessageCallback = onMessage;
    this.isConnecting = true;
    this.createConnection();
  }

  private createConnection(): void {
    try {
      if (this.ws) {
        this.ws.close();
      }

      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = undefined;
        }
        this.setupPingInterval();
      };

      this.ws.onmessage = (event) => {
        if (this.onMessageCallback) {
          try {
            const data = JSON.parse(event.data as string);
            this.onMessageCallback(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.close();
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket closed');
        this.isConnecting = false;
        this.clearPingInterval();
        this.onCloseCallback?.();
        this.handleReconnect();
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private setupPingInterval(): void {
    this.clearPingInterval();
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  private clearPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    }
  }

  private handleReconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);
      
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.createConnection();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
      }
    }
  }

  disconnect(): void {
    this.clearPingInterval();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}