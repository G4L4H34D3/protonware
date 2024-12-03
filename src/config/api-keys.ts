import { ENV } from './env';

export const API_KEYS = {
  binance: {
    apiKey: ENV.BINANCE_API_KEY,
    apiSecret: ENV.BINANCE_API_SECRET
  },
  foxbit: {
    apiKey: ENV.FOXBIT_API_KEY,
    apiSecret: ENV.FOXBIT_API_SECRET
  }
};