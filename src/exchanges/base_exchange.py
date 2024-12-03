from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from decimal import Decimal

class BaseExchange(ABC):
    def __init__(self, api_key: str, api_secret: str):
        self.api_key = api_key
        self.api_secret = api_secret

    @abstractmethod
    async def get_ticker(self, symbol: str) -> Dict:
        """Get current ticker information for a symbol."""
        pass

    @abstractmethod
    async def place_order(self, symbol: str, side: str, amount: Decimal, price: Optional[Decimal] = None) -> Dict:
        """Place a new order."""
        pass

    @abstractmethod
    async def get_balance(self, currency: str) -> Decimal:
        """Get balance for a specific currency."""
        pass

    @abstractmethod
    async def transfer(self, currency: str, amount: Decimal, destination: str) -> Dict:
        """Transfer funds to another address/exchange."""
        pass

    @abstractmethod
    async def get_order_status(self, order_id: str) -> Dict:
        """Get the current status of an order."""
        pass