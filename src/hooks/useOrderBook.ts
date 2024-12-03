import { useState, useEffect } from 'react';
import { OrderBook, OrderBookEntry } from '../types/orderBook';

const generateMockOrderBook = (basePrice: number, symbol: string): OrderBook => {
  const generateEntries = (basePrice: number, isBid: boolean): OrderBookEntry[] => {
    return Array.from({ length: 8 }, (_, i) => {
      const priceOffset = isBid ? -i * 0.01 : i * 0.01;
      const price = basePrice * (1 + priceOffset);
      
      // Generate realistic liquidity values based on the asset price
      const baseQuantity = basePrice < 10 ? 1000 : // For low-priced assets like DOGE
                          basePrice < 100 ? 100 : // For mid-priced assets like ADA
                          basePrice < 1000 ? 10 : // For higher-priced assets like BNB
                          basePrice < 10000 ? 1 : // For ETH
                          0.1; // For BTC
      
      const quantity = baseQuantity * (1 + Math.random() * 0.5); // Add some randomness
      const liquidity = price * quantity;

      return {
        price,
        quantity,
        liquidity
      };
    }).sort((a, b) => isBid ? b.price - a.price : a.price - b.price);
  };

  return {
    symbol,
    exchange: 'binance',
    bids: generateEntries(basePrice, true),
    asks: generateEntries(basePrice, false),
    timestamp: Date.now(),
    totalBidLiquidity: 0, // Will be calculated in the component
    totalAskLiquidity: 0  // Will be calculated in the component
  };
};

export const useOrderBook = (symbol: string, exchange: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol || !exchange) return;

    let interval: NodeJS.Timeout;
    
    const fetchOrderBook = () => {
      try {
        // Base prices for different symbols
        const basePrice = parseFloat(
          symbol.includes('BTC') ? '251450' : 
          symbol.includes('ETH') ? '12450' :
          symbol.includes('BNB') ? '1485' :
          symbol.includes('XRP') ? '3.15' :
          symbol.includes('ADA') ? '2.45' :
          symbol.includes('DOGE') ? '0.45' :
          symbol.includes('SOL') ? '485' : '4.85'
        );

        const mockOrderBook = generateMockOrderBook(basePrice, symbol);
        
        // Calculate total liquidity
        mockOrderBook.totalBidLiquidity = mockOrderBook.bids.reduce((sum, bid) => sum + bid.liquidity, 0);
        mockOrderBook.totalAskLiquidity = mockOrderBook.asks.reduce((sum, ask) => sum + ask.liquidity, 0);
        
        setOrderBook(mockOrderBook);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch order book');
        setIsLoading(false);
      }
    };

    fetchOrderBook();
    interval = setInterval(fetchOrderBook, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [symbol, exchange]);

  return { orderBook, isLoading, error };
};