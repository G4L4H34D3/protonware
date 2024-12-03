import { BinanceCredentials, BinanceError } from './types';
import { generateSignature } from './utils';
import { BinanceApiError, BinanceNetworkError } from './error';
import { retry, isRetryableError } from './retry';
import { logger } from './logger';

export class BinanceAPI {
  private readonly baseUrl: string = '/api/binance';
  private readonly credentials: BinanceCredentials;

  constructor(credentials: BinanceCredentials) {
    this.credentials = credentials;
  }

  async request<T>(
    endpoint: string,
    method: string = 'GET',
    params: Record<string, string> = {},
    signed: boolean = true
  ): Promise<T> {
    const operation = async () => {
      try {
        const timestamp = Date.now().toString();
        const queryParams = new URLSearchParams(params);

        if (signed) {
          queryParams.append('timestamp', timestamp);
          const signature = generateSignature(queryParams.toString(), this.credentials.apiSecret);
          queryParams.append('signature', signature);
        }

        const url = `${this.baseUrl}${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

        logger.debug('Making API request', { endpoint, method });

        const response = await fetch(url, {
          method,
          headers: {
            'X-MBX-APIKEY': this.credentials.apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData: BinanceError = await response.json();
          throw new BinanceApiError(
            errorData.msg || `HTTP error! status: ${response.status}`,
            errorData.code,
            response.status,
            errorData
          );
        }

        const data = await response.json();
        logger.debug('API request successful', { endpoint });
        return data;
      } catch (error) {
        if (error instanceof BinanceApiError) {
          throw error;
        }
        throw new BinanceNetworkError(
          `Network error: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : undefined
        );
      }
    };

    return retry(operation, {
      maxAttempts: 3,
      shouldRetry: isRetryableError
    });
  }

  async createListenKey(): Promise<{ listenKey: string }> {
    return this.request('/api/v3/userDataStream', 'POST', {}, false);
  }

  async keepAliveListenKey(listenKey: string): Promise<void> {
    return this.request('/api/v3/userDataStream', 'PUT', { listenKey }, false);
  }

  async deleteListenKey(listenKey: string): Promise<void> {
    return this.request('/api/v3/userDataStream', 'DELETE', { listenKey }, false);
  }
}