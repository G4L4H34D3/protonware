import { FoxbitCredentials, FoxbitError, FoxbitOrderBook } from './types';
import { generateSignature } from './utils';
import { FoxbitApiError, FoxbitNetworkError } from './error';
import { retry, isRetryableError } from './retry';
import { logger } from './logger';

export class FoxbitAPI {
  private readonly baseUrl: string = 'https://api.foxbit.com.br';
  private readonly credentials: FoxbitCredentials;

  constructor(credentials: FoxbitCredentials) {
    this.credentials = credentials;
  }

  async getOrderBook(symbol: string): Promise<FoxbitOrderBook> {
    return this.request(`/api/v4/market/orderbook/${symbol}`, 'GET', {
      limit: '20' // Request more than needed to ensure we have enough valid orders
    }, false);
  }

  // ... rest of the class implementation remains the same
}