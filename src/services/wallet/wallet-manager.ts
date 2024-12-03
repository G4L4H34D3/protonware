import { WalletService, WalletAsset, Exchange } from './types';
import { BinanceWallet } from './binance-wallet';
import { FoxbitWallet } from './foxbit-wallet';
import { API_KEYS } from '../../config/api-keys';

export class WalletManager {
  private wallets: Map<Exchange, WalletService>;
  private balanceCallback?: (exchange: Exchange, assets: WalletAsset[]) => void;

  constructor() {
    this.wallets = new Map();
    this.initializeWallets();
  }

  private initializeWallets(): void {
    // Initialize Binance wallet if API keys are available
    if (API_KEYS.binance.apiKey && API_KEYS.binance.apiSecret) {
      this.wallets.set('binance', new BinanceWallet());
    }

    // Initialize Foxbit wallet if API keys are available
    if (API_KEYS.foxbit.apiKey && API_KEYS.foxbit.apiSecret) {
      this.wallets.set('foxbit', new FoxbitWallet());
    }
  }

  async getAllBalances(): Promise<Map<Exchange, WalletAsset[]>> {
    const allBalances = new Map<Exchange, WalletAsset[]>();
    
    for (const [exchange, wallet] of this.wallets.entries()) {
      try {
        const assets = await wallet.getBalances();
        allBalances.set(exchange, assets);
      } catch (error) {
        console.error(`Error fetching balances from ${exchange}:`, error);
        allBalances.set(exchange, []);
      }
    }

    return allBalances;
  }

  subscribeToBalanceUpdates(callback: (exchange: Exchange, assets: WalletAsset[]) => void): void {
    this.balanceCallback = callback;

    for (const [exchange, wallet] of this.wallets.entries()) {
      wallet.subscribeToBalanceUpdates((assets) => {
        this.balanceCallback?.(exchange, assets);
      });
    }
  }

  unsubscribeFromBalanceUpdates(): void {
    for (const wallet of this.wallets.values()) {
      wallet.unsubscribeFromBalanceUpdates();
    }
    this.balanceCallback = undefined;
  }

  getWallet(exchange: Exchange): WalletService | undefined {
    return this.wallets.get(exchange);
  }

  getSupportedExchanges(): Exchange[] {
    return Array.from(this.wallets.keys());
  }

  hasWallet(exchange: Exchange): boolean {
    return this.wallets.has(exchange);
  }
}