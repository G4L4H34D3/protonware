import axios from 'axios';
import { ENV } from '../../config/env';

export const binanceApi = axios.create({
  baseURL: 'https://api.binance.com',
  headers: {
    'X-MBX-APIKEY': ENV.BINANCE_API_KEY
  }
});

export const foxbitApi = axios.create({
  baseURL: 'https://api.foxbit.com.br',
  headers: {
    'X-API-Key': ENV.FOXBIT_API_KEY
  }
});