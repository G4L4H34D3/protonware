import { ArbitrageOpportunity } from '../exchanges/types';
import { BinanceAPI } from '../exchanges/binance-api';
import { FoxbitAPI } from '../exchanges/foxbit-api';
import { ENV } from '../../config/env';
import { sleep } from '../../utils/helpers';

export class ArbitrageExecutor {
  private binanceAPI: BinanceAPI;
  private foxbitAPI: FoxbitAPI;

  constructor() {
    this.binanceAPI = new BinanceAPI({
      apiKey: ENV.BINANCE_API_KEY,
      apiSecret: ENV.BINANCE_API_SECRET
    });

    this.foxbitAPI = new FoxbitAPI({
      apiKey: ENV.FOXBIT_API_KEY,
      apiSecret: ENV.FOXBIT_API_SECRET
    });
  }

  async executeArbitrage(opportunity: ArbitrageOpportunity): Promise<boolean> {
    try {
      // 1. Validate opportunity is still profitable
      const currentSpread = await this.validateSpread(opportunity);
      if (currentSpread < ENV.MIN_PROFIT_THRESHOLD) {
        console.log('Opportunity no longer profitable');
        return false;
      }

      // 2. Execute buy order
      const buyOrder = await this.executeBuyOrder(opportunity);
      if (!buyOrder) return false;

      // 3. Wait for buy order confirmation
      const buyConfirmed = await this.waitForOrderConfirmation(
        opportunity.buyExchange,
        buyOrder.orderId
      );
      if (!buyConfirmed) return false;

      // 4. Transfer assets
      const transferSuccess = await this.transferAssets(
        opportunity.symbol,
        opportunity.buyExchange,
        opportunity.sellExchange,
        buyOrder.executedQty
      );
      if (!transferSuccess) return false;

      // 5. Execute sell order
      const sellOrder = await this.executeSellOrder(opportunity, buyOrder.executedQty);
      if (!sellOrder) return false;

      // 6. Wait for sell order confirmation
      const sellConfirmed = await this.waitForOrderConfirmation(
        opportunity.sellExchange,
        sellOrder.orderId
      );

      return sellConfirmed;
    } catch (error) {
      console.error('Error executing arbitrage:', error);
      return false;
    }
  }

  private async validateSpread(opportunity: ArbitrageOpportunity): Promise<number> {
    const [buyPrice, sellPrice] = await Promise.all([
      this.getPrice(opportunity.buyExchange, opportunity.symbol),
      this.getPrice(opportunity.sellExchange, opportunity.symbol)
    ]);

    return ((sellPrice - buyPrice) / buyPrice) * 100;
  }

  private async getPrice(exchange: string, symbol: string): Promise<number> {
    if (exchange === 'binance') {
      return (await this.binanceAPI.getPrice(symbol)).ask;
    } else {
      return (await this.foxbitAPI.getPrice(symbol)).ask;
    }
  }

  private async executeBuyOrder(opportunity: ArbitrageOpportunity) {
    const api = opportunity.buyExchange === 'binance' ? this.binanceAPI : this.foxbitAPI;
    try {
      return await api.placeOrder(opportunity.symbol, 'buy', ENV.MAX_TRADE_AMOUNT);
    } catch (error) {
      console.error('Error executing buy order:', error);
      return null;
    }
  }

  private async executeSellOrder(opportunity: ArbitrageOpportunity, quantity: number) {
    const api = opportunity.sellExchange === 'binance' ? this.binanceAPI : this.foxbitAPI;
    try {
      return await api.placeOrder(opportunity.symbol, 'sell', quantity);
    } catch (error) {
      console.error('Error executing sell order:', error);
      return null;
    }
  }

  private async waitForOrderConfirmation(exchange: string, orderId: string): Promise<boolean> {
    const maxAttempts = 10;
    const interval = 2000; // 2 seconds

    for (let i = 0; i < maxAttempts; i++) {
      const api = exchange === 'binance' ? this.binanceAPI : this.foxbitAPI;
      const status = await api.getOrderStatus(orderId);

      if (status === 'filled') {
        return true;
      }

      if (status === 'canceled' || status === 'rejected') {
        return false;
      }

      await sleep(interval);
    }

    return false;
  }

  private async transferAssets(
    symbol: string,
    fromExchange: string,
    toExchange: string,
    amount: number
  ): Promise<boolean> {
    try {
      const api = fromExchange === 'binance' ? this.binanceAPI : this.foxbitAPI;
      const destinationAddress = await this.getDestinationAddress(toExchange, symbol);
      
      await api.transfer(symbol, amount, destinationAddress);
      return true;
    } catch (error) {
      console.error('Error transferring assets:', error);
      return false;
    }
  }

  private async getDestinationAddress(exchange: string, symbol: string): Promise<string> {
    // In a real implementation, you would fetch the deposit address from the destination exchange
    // For now, we'll return a placeholder
    return 'destination-address';
  }
}