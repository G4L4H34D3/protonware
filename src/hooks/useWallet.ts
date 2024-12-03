import { useState, useEffect } from 'react';
import { BinanceWallet } from '../services/wallet/binance-wallet';
import { WalletAsset } from '../services/wallet/types';

export const useWallet = () => {
  const [assets, setAssets] = useState<WalletAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wallet = new BinanceWallet();

    const loadAssets = async () => {
      try {
        const walletAssets = await wallet.getBalances();
        setAssets(walletAssets);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load wallet assets');
        setIsLoading(false);
      }
    };

    loadAssets();
    wallet.subscribeToBalanceUpdates(setAssets);

    return () => {
      wallet.unsubscribeFromBalanceUpdates();
    };
  }, []);

  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.balance.available + asset.balance.inOrder) * asset.price,
    0
  );

  const totalChange24h = assets.reduce(
    (sum, asset) => {
      const assetValue = (asset.balance.available + asset.balance.inOrder) * asset.price;
      return sum + (assetValue * asset.change24h) / 100;
    },
    0
  );

  return {
    assets,
    isLoading,
    error,
    totalValue,
    totalChange24h,
  };
};