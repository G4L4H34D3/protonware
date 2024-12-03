import { useState } from 'react';
import { WalletAsset, Exchange } from '../services/wallet/types';

export const useWalletManager = () => {
  const [wallets, setWallets] = useState<Record<Exchange, WalletAsset[]>>({
    binance: [],
    foxbit: []
  });

  const updateWalletBalance = async (
    exchange: string,
    currency: string,
    amount: number
  ): Promise<void> => {
    setWallets(prev => {
      const exchangeWallets = [...(prev[exchange as Exchange] || [])];
      const assetIndex = exchangeWallets.findIndex(
        asset => asset.symbol.startsWith(currency)
      );

      if (assetIndex >= 0) {
        exchangeWallets[assetIndex] = {
          ...exchangeWallets[assetIndex],
          balance: {
            ...exchangeWallets[assetIndex].balance,
            available: exchangeWallets[assetIndex].balance.available + amount
          }
        };
      }

      return {
        ...prev,
        [exchange]: exchangeWallets
      };
    });
  };

  const getWalletBalance = (exchange: string, currency: string): number => {
    const exchangeWallets = wallets[exchange as Exchange] || [];
    const asset = exchangeWallets.find(a => a.symbol.startsWith(currency));
    return asset?.balance.available || 0;
  };

  // Mock initial wallet data
  const summary = {
    totalValue: 100000,
    totalChange24h: 2.5,
    exchanges: {
      binance: {
        assets: [
          {
            id: 'btc',
            name: 'Bitcoin',
            symbol: 'BTC/BRL',
            balance: { available: 0.5, inOrder: 0 },
            price: 251450.00,
            change24h: 1.2,
            totalValue: 125725.00
          }
        ],
        totalValue: 125725.00,
        totalChange24h: 1.2
      },
      foxbit: {
        assets: [
          {
            id: 'eth',
            name: 'Ethereum',
            symbol: 'ETH/BRL',
            balance: { available: 10, inOrder: 0 },
            price: 12450.00,
            change24h: 2.1,
            totalValue: 124500.00
          }
        ],
        totalValue: 124500.00,
        totalChange24h: 2.1
      }
    }
  };

  return {
    summary,
    updateWalletBalance,
    getWalletBalance
  };
};