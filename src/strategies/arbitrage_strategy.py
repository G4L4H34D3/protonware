from decimal import Decimal
from typing import Dict, Tuple
import asyncio
from ..exchanges.base_exchange import BaseExchange
from ..config.settings import MIN_PROFIT_THRESHOLD, MAX_TRADE_AMOUNT
from ..utils.logger import get_logger

logger = get_logger(__name__)

class ArbitrageStrategy:
    def __init__(self, exchange_x: BaseExchange, exchange_y: BaseExchange):
        self.exchange_x = exchange_x
        self.exchange_y = exchange_y

    async def calculate_profit_opportunity(self, symbol: str) -> Tuple[bool, Decimal]:
        """Calculate potential profit for arbitrage opportunity."""
        try:
            # Get prices from both exchanges
            price_x = await self.exchange_x.get_ticker(symbol)
            price_y = await self.exchange_y.get_ticker(symbol)

            # Calculate price difference percentage
            price_diff = ((price_y['bid'] - price_x['ask']) / price_x['ask']) * 100

            # Check if profit meets minimum threshold
            profitable = price_diff > MIN_PROFIT_THRESHOLD

            return profitable, Decimal(str(price_diff))

        except Exception as e:
            logger.error(f"Error calculating profit opportunity: {str(e)}")
            return False, Decimal('0')

    async def execute_arbitrage(self, symbol: str) -> bool:
        """Execute arbitrage trade if profitable opportunity exists."""
        try:
            profitable, profit_percentage = await self.calculate_profit_opportunity(symbol)

            if not profitable:
                return False

            # Calculate trade amount based on available balances and maximum limits
            balance_x = await self.exchange_x.get_balance(symbol.split('/')[1])  # Quote currency
            trade_amount = min(MAX_TRADE_AMOUNT, float(balance_x))

            # Execute trades
            # 1. Buy on exchange X
            buy_order = await self.exchange_x.place_order(
                symbol=symbol,
                side='buy',
                amount=Decimal(str(trade_amount))
            )

            # 2. Transfer to exchange Y
            await self.exchange_x.transfer(
                currency=symbol.split('/')[0],  # Base currency
                amount=Decimal(str(trade_amount)),
                destination='exchange_y'
            )

            # 3. Sell on exchange Y
            sell_order = await self.exchange_y.place_order(
                symbol=symbol,
                side='sell',
                amount=Decimal(str(trade_amount))
            )

            logger.info(f"Arbitrage executed successfully: {profit_percentage}% profit")
            return True

        except Exception as e:
            logger.error(f"Error executing arbitrage: {str(e)}")
            return False