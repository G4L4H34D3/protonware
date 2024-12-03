import { useState, useEffect } from 'react';
import { ArbitrageOpportunity } from '../services/exchanges/types';

const MOCK_OPPORTUNITIES: ArbitrageOpportunity[] = [
  {
    symbol: 'BTC/BRL',
    buyExchange: 'Binance',
    sellExchange: 'Foxbit',
    buyPrice: 251450.00,
    sellPrice: 256985.00,
    spread: 2.20,
    timestamp: Date.now()
  },
  {
    symbol: 'ETH/BRL',
    buyExchange: 'Foxbit',
    sellExchange: 'Binance',
    buyPrice: 12450.00,
    sellPrice: 12680.00,
    spread: 1.85,
    timestamp: Date.now()
  },
  {
    symbol: 'BNB/BRL',
    buyExchange: 'Binance',
    sellExchange: 'Foxbit',
    buyPrice: 1485.00,
    sellPrice: 1515.00,
    spread: 2.02,
    timestamp: Date.now()
  },
  {
    symbol: 'XRP/BRL',
    buyExchange: 'Foxbit',
    sellExchange: 'Binance',
    buyPrice: 3.15,
    sellPrice: 3.21,
    spread: 1.90,
    timestamp: Date.now()
  },
  {
    symbol: 'ADA/BRL',
    buyExchange: 'Binance',
    sellExchange: 'Foxbit',
    buyPrice: 2.45,
    sellPrice: 2.50,
    spread: 2.04,
    timestamp: Date.now()
  },
  {
    symbol: 'DOGE/BRL',
    buyExchange: 'Foxbit',
    sellExchange: 'Binance',
    buyPrice: 0.45,
    sellPrice: 0.459,
    spread: 2.00,
    timestamp: Date.now()
  },
  {
    symbol: 'SOL/BRL',
    buyExchange: 'Binance',
    sellExchange: 'Foxbit',
    buyPrice: 485.00,
    sellPrice: 495.00,
    spread: 2.06,
    timestamp: Date.now()
  },
  {
    symbol: 'MATIC/BRL',
    buyExchange: 'Foxbit',
    sellExchange: 'Binance',
    buyPrice: 4.85,
    sellPrice: 4.95,
    spread: 2.06,
    timestamp: Date.now()
  }
];

export const useArbitrageMonitor = (symbols: string[]) => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    setIsMonitoring(true);
    
    // Simulate real-time updates by slightly modifying the prices every second
    const interval = setInterval(() => {
      const updatedOpportunities = MOCK_OPPORTUNITIES.map(opp => ({
        ...opp,
        buyPrice: opp.buyPrice * (1 + (Math.random() * 0.002 - 0.001)),
        sellPrice: opp.sellPrice * (1 + (Math.random() * 0.002 - 0.001)),
        timestamp: Date.now()
      }));

      // Recalculate spreads based on new prices
      updatedOpportunities.forEach(opp => {
        opp.spread = ((opp.sellPrice - opp.buyPrice) / opp.buyPrice) * 100;
      });

      setOpportunities(updatedOpportunities);
    }, 1000);

    return () => {
      clearInterval(interval);
      setIsMonitoring(false);
    };
  }, [symbols]);

  return { opportunities, isMonitoring };
};