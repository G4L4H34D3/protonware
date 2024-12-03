import React from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import OrderBookCard from './components/OrderBookCard';
import SpreadIndicator from './components/SpreadIndicator';
import { formatCurrency } from '../../utils/formatters';

const OrderBookPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('gray.700', 'gray.600');

  // Mock data - replace with real data from your API
  const mockOrderBook = {
    symbol: 'ALICE/BRL',
    buyExchange: 'Foxbit',
    sellExchange: 'Binance',
    buyPrice: 9.99,
    sellPrice: 10.2765,
    spread: 2.87,
    bids: [
      { price: 9.99, amount: 100.5, total: 1004.995 },
      { price: 9.98, amount: 150.2, total: 1498.996 },
      { price: 9.97, amount: 200.0, total: 1994.000 },
    ],
    asks: [
      { price: 10.2765, amount: 120.3, total: 1236.213 },
      { price: 10.2800, amount: 180.5, total: 1855.540 },
      { price: 10.2900, amount: 250.0, total: 2572.500 },
    ],
  };

  return (
    <Container maxW="1200px" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Box>
          <OrderBookCard
            exchange={mockOrderBook.buyExchange}
            type="buy"
            orders={mockOrderBook.bids}
          />
        </Box>

        <Box>
          <OrderBookCard
            exchange={mockOrderBook.sellExchange}
            type="sell"
            orders={mockOrderBook.asks}
          />
        </Box>
      </SimpleGrid>

      <Box mt={6}>
        <SpreadIndicator
          buyExchange={mockOrderBook.buyExchange}
          sellExchange={mockOrderBook.sellExchange}
          buyPrice={mockOrderBook.buyPrice}
          sellPrice={mockOrderBook.sellPrice}
          spread={mockOrderBook.spread}
        />
      </Box>
    </Container>
  );
};

export default OrderBookPage;