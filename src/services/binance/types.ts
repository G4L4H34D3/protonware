export interface BinanceCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface BinanceBalance {
  asset: string;
  free: string;
  locked: string;
}

export interface BinanceAccountInfo {
  balances: BinanceBalance[];
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
}

export interface BinanceTickerPrice {
  symbol: string;
  price: string;
}

export interface BinanceTicker24hr {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  volume: string;
}

export interface BinanceListenKey {
  listenKey: string;
}

export interface BinanceError {
  code: number;
  msg: string;
}