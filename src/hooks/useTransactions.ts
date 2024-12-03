import { useState, useEffect } from 'react';
import { Transaction } from '../types/transaction';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'buy',
            symbol: 'BTC/USDT',
            amount: 0.1,
            price: 45000,
            timestamp: Date.now() - 3600000,
            status: 'completed',
            isArbitrage: true,
            exchange: 'binance'
          },
          {
            id: '2',
            type: 'sell',
            symbol: 'BTC/USDT',
            amount: 0.1,
            price: 45500,
            buyPrice: 45000,
            timestamp: Date.now() - 3500000,
            status: 'completed',
            isArbitrage: true,
            exchange: 'foxbit'
          },
          // Add more mock transactions as needed
        ];

        setTransactions(mockTransactions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const arbitrageTransactions = transactions.filter(t => t.isArbitrage);

  return {
    transactions,
    arbitrageTransactions,
    isLoading,
    error
  };
};