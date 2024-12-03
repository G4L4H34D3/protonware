import { ExchangeAPI, PriceData, ArbitrageOpportunity } from '../exchanges/types';

export class ArbitrageDetector {
  private exchanges: ExchangeAPI[];
  private opportunities: Map<string, ArbitrageOpportunity> = new Map();
  private minSpreadPercentage: number;
  private onOpportunityCallback: (opportunity: ArbitrageOpportunity) => void;

  constructor(
    exchanges: ExchangeAPI[],
    minSpreadPercentage: number,
    onOpportunity: (opportunity: ArbitrageOpportunity) => void
  ) {
    this.exchanges = exchanges;
    this.minSpreadPercentage = minSpreadPercentage;
    this.onOpportunityCallback = onOpportunity;
  }

  startMonitoring(symbols: string[]): void {
    symbols.forEach(symbol => {
      this.exchanges.forEach(exchange => {
        exchange.subscribeToPrice(symbol, (price: PriceData) => {
          this.analyzePrices(symbol);
        });
      });
    });
  }

  private async analyzePrices(symbol: string): Promise<void> {
    try {
      const prices = await Promise.all(
        this.exchanges.map(async exchange => ({
          exchange: exchange.getName(),
          price: await exchange.getPrice(symbol)
        }))
      );

      for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
          const buyPrice = prices[i].price;
          const sellPrice = prices[j].price;

          // Calculate spread in both directions
          this.checkSpread(symbol, prices[i], prices[j]);
          this.checkSpread(symbol, prices[j], prices[i]);
        }
      }
    } catch (error) {
      console.error('Error analyzing prices:', error);
    }
  }

  private checkSpread(
    symbol: string,
    buyExchangeData: { exchange: string; price: PriceData },
    sellExchangeData: { exchange: string; price: PriceData }
  ): void {
    const spread = ((sellExchangeData.price.bid - buyExchangeData.price.ask) / buyExchangeData.price.ask) * 100;

    if (spread >= this.minSpreadPercentage) {
      const opportunity: ArbitrageOpportunity = {
        symbol,
        buyExchange: buyExchangeData.exchange,
        sellExchange: sellExchangeData.exchange,
        buyPrice: buyExchangeData.price.ask,
        sellPrice: sellExchangeData.price.bid,
        spread,
        timestamp: Date.now()
      };

      const key = `${symbol}-${buyExchangeData.exchange}-${sellExchangeData.exchange}`;
      this.opportunities.set(key, opportunity);
      this.onOpportunityCallback(opportunity);
    }
  }

  stopMonitoring(symbols: string[]): void {
    symbols.forEach(symbol => {
      this.exchanges.forEach(exchange => {
        exchange.unsubscribeFromPrice(symbol);
      });
    });
  }
}