export type Exchange = 'binance' | 'foxbit';

export interface WalletBalance {
  symbol: string;
  available: number;
  inOrder: number;
}

export interface WalletAsset {
  id: string;
  name: string;
  symbol: string;
  balance: WalletBalance;
  price: number;
  change24h: number;
  icon?: any;
  exchange: Exchange;
}

export interface WalletService {
  getBalances(): Promise<WalletAsset[]>;
  subscribeToBalanceUpdates(callback: (assets: WalletAsset[]) => void): void;
  unsubscribeFromBalanceUpdates(): void;
}

export interface WalletSummary {
  totalValue: number;
  totalChange24h: number;
  exchanges: {
    [key in Exchange]?: {
      assets: WalletAsset[];
      totalValue: number;
      totalChange24h: number;
    };
  };
}