import { WalletService, WalletAsset } from './types';
import { BinanceClient } from '../binance/BinanceClient';
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin } from 'react-icons/si';
import { logger } from '../binance/logger';

const ICON_MAP: { [key: string]: any } = {
  BTC: SiBitcoin,
  ETH: SiEthereum,
  LTC: SiLitecoin,
  DOGE: SiDogecoin,
};

const NAME_MAP: { [key: string]: string } = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin',
  DOGE: 'Dogecoin',
};

export class BinanceWallet implements WalletService {
  private client: BinanceClient;
  private balanceCallback?: (assets: WalletAsset[]) => void;

  constructor() {
    this.client = new BinanceClient();
  }

  async getBalances(): Promise<WalletAsset[]> {
    try {
      const accountInfo = await this.client.getAccountInfo();
      const tickerPrices = await this.client.getTickerPrice();
      const ticker24h = await this.client.get24hrTicker();

      const priceMap = new Map(
        tickerPrices.map((ticker: any) => [
          ticker.symbol.replace('USDT', ''),
          parseFloat(ticker.price)
        ])
      );

      const changeMap = new Map(
        ticker24h.map((ticker: any) => [
          ticker.symbol.replace('USDT', ''),
          parseFloat(ticker.priceChangePercent)
        ])
      );

      const assets = accountInfo.balances
        .filter((balance: any) => parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0)
        .map((balance: any) => {
          const symbol = balance.asset;
          const price = priceMap.get(symbol) || 0;
          const change24h = changeMap.get(symbol) || 0;

          return {
            id: symbol.toLowerCase(),
            name: NAME_MAP[symbol] || symbol,
            symbol: `${symbol}/USDT`,
            balance: {
              available: parseFloat(balance.free),
              inOrder: parseFloat(balance.locked),
            },
            price,
            change24h,
            icon: ICON_MAP[symbol],
            exchange: 'binance' as const
          };
        });

      return assets.filter(asset => asset.price > 0);
    } catch (error) {
      logger.error('Error fetching balances', { error });
      return [];
    }
  }

  subscribeToBalanceUpdates(callback: (assets: WalletAsset[]) => void): void {
    this.balanceCallback = callback;
    this.client.subscribeToUserData(async () => {
      try {
        const assets = await this.getBalances();
        this.balanceCallback?.(assets);
      } catch (error) {
        logger.error('Error updating balances', { error });
      }
    });
  }

  unsubscribeFromBalanceUpdates(): void {
    this.client.unsubscribeFromUserData();
    this.balanceCallback = undefined;
  }
}