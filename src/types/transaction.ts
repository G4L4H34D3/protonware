export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  buyPrice?: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  isArbitrage: boolean;
  exchange: string;
}