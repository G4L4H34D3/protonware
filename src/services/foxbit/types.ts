export interface FoxbitCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface FoxbitError {
  code: number;
  message: string;
}

export interface FoxbitOrderBook {
  bids: [string, string][];
  asks: [string, string][];
  timestamp: number;
}

export interface FoxbitTicker {
  symbol: string;
  bid: string;
  ask: string;
  last: string;
  volume: string;
  timestamp: number;
}

export interface FoxbitBalance {
  currency: string;
  available: string;
  locked: string;
}