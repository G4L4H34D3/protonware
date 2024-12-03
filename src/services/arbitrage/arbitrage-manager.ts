import { BinanceAPI } from '../exchanges/binance-api';
import { FoxbitAPI } from '../exchanges/foxbit-api';
import { ArbitrageDetector } from './arbitrage-detector';
import { API_KEYS } from '../../config/api-keys';
import { ArbitrageOpportunity } from '../exchanges/types';

export class ArbitrageManager {
  private detector: ArbitrageDetector;
  private activeSymbols: string[] = [];

  constructor(onOpportunity: (opportunity: ArbitrageOpportunity) => void) {
    const binanceAPI = new BinanceAPI({
      apiKey: API_KEYS.binance.apiKey,
      apiSecret: API_KEYS.binance.apiSecret
    });

    const foxbitAPI = new FoxbitAPI({
      apiKey: API_KEYS.foxbit.apiKey,
      apiSecret: API_KEYS.foxbit.apiSecret
    });

    this.detector = new ArbitrageDetector(
      [binanceAPI, foxbitAPI],
      1.0, // 1% minimum spread
      onOpportunity
    );
  }

  startMonitoring(symbols: string[]): void {
    this.activeSymbols = symbols;
    this.detector.startMonitoring(symbols);
  }

  stopMonitoring(): void {
    this.detector.stopMonitoring(this.activeSymbols);
    this.activeSymbols = [];
  }
}