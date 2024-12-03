from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Exchange API credentials
EXCHANGE_X_API_KEY = os.getenv('EXCHANGE_X_API_KEY')
EXCHANGE_X_SECRET = os.getenv('EXCHANGE_X_SECRET')
EXCHANGE_Y_API_KEY = os.getenv('EXCHANGE_Y_API_KEY')
EXCHANGE_Y_SECRET = os.getenv('EXCHANGE_Y_SECRET')

# Trading parameters
MIN_PROFIT_THRESHOLD = float(os.getenv('MIN_PROFIT_THRESHOLD', '0.5'))  # Minimum profit percentage
MAX_TRADE_AMOUNT = float(os.getenv('MAX_TRADE_AMOUNT', '100'))  # Maximum trade amount in base currency
TRADING_PAIRS = ['BTC/USDT', 'ETH/USDT']  # Trading pairs to monitor

# Risk management
MAX_DAILY_TRADES = int(os.getenv('MAX_DAILY_TRADES', '10'))
STOP_LOSS_PERCENTAGE = float(os.getenv('STOP_LOSS_PERCENTAGE', '1.0'))

# Technical parameters
PRICE_CHECK_INTERVAL = float(os.getenv('PRICE_CHECK_INTERVAL', '1.0'))  # seconds
ORDER_TIMEOUT = float(os.getenv('ORDER_TIMEOUT', '30.0'))  # seconds
MAX_RETRIES = int(os.getenv('MAX_RETRIES', '3'))