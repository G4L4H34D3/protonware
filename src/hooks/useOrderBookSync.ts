import { useState, useEffect } from 'react';
import { OrderBook } from '../types/orderBook';
import { BinanceClient } from '../services/binance/client';
import { FoxbitAPI } from '../services/foxbit/api';
import { API_KEYS } from '../config/api-keys';

export const useOrderBookSync = (symbol: string, exchanges: string[]) => {
  const [orderBooks, setOrderBooks] = useState<Record<string, OrderBook>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol || exchanges.length === 0) return;

    const binanceClient = new BinanceClient();
    const foxbitApi = new FoxbitAPI({
      apiKey: API_KEYS.foxbit.apiKey,
      apiSecret: API_KEYS.foxbit.apiSecret
    });

    let interval: NodeJS.Timeout;

    const fetchOrderBooks = async () => {
      try {
        const orderBookPromises = exchanges.map(async (exchange) => {
          if (exchange.toLowerCase() === 'binance') {
            return binanceClient.getOrderBook(symbol);
          } else if (exchange.toLowerCase() === 'foxbit') {
            return foxbitApi.getOrderBook(symbol);
          }
          throw new Error(`Unsupported exchange: ${exchange}`);
        });

        const results = await Promise.all(orderBookPromises);
        const newOrderBooks: Record<string, OrderBook> = {};

        results.forEach((orderBook, index) => {
          const exchange = exchanges[index].toLowerCase();
          newOrderBooks[exchange] = orderBook;
        });

        setOrderBooks(newOrderBooks);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch order books');
        setIsLoading(false);
      }
    };

    fetchOrderBooks();
    interval = setInterval(fetchOrderBooks, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [symbol, exchanges.join(',')]);

  return { orderBooks, isLoading, error };
};