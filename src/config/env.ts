export const ENV = {
  // API Keys
  BINANCE_API_KEY: import.meta.env.VITE_BINANCE_API_KEY || 'gTlwXMy9Mfgbqdp1nbUtkPnZcmLtGMQ0bPd9fng1Qgoy30FlxGqo1fkOuZF40BMs',
  BINANCE_API_SECRET: import.meta.env.VITE_BINANCE_API_SECRET || 'your-binance-secret-here',
  FOXBIT_API_KEY: import.meta.env.VITE_FOXBIT_API_KEY || 'f4HLCMYezB1PcYTlGVFP4y8iKAQwhWPm9QgGbgwB',
  FOXBIT_API_SECRET: import.meta.env.VITE_FOXBIT_API_SECRET || 'your-foxbit-secret-here',

  // Trading parameters
  MIN_PROFIT_THRESHOLD: 1.0,
  MAX_TRADE_AMOUNT: 100,
  MAX_DAILY_TRADES: 10,
  STOP_LOSS_PERCENTAGE: 1.0,

  // Technical parameters
  PRICE_CHECK_INTERVAL: 1.0,
  ORDER_TIMEOUT: 30.0,
  MAX_RETRIES: 3,

  // WebSocket endpoints
  BINANCE_WS_URL: 'wss://stream.binance.com:9443',
  FOXBIT_WS_URL: 'wss://api.foxbit.com.br/ws/v1',

  // API endpoints
  BINANCE_API_URL: 'https://api.binance.com',
  FOXBIT_API_URL: 'https://api.foxbit.com.br'
};