export interface OrderBookEntry {
  price: number;
  quantity: number;
  liquidity: number;
}

export interface OrderBook {
  symbol: string;
  exchange: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  timestamp: number;
  totalBidLiquidity: number;
  totalAskLiquidity: number;
  spreadPercentage: number;
}