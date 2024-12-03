import React from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { formatCurrency } from '../../../utils/formatters';

interface Order {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookCardProps {
  exchange: string;
  type: 'buy' | 'sell';
  orders: Order[];
}

const EXCHANGE_ICONS = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const OrderBookCard: React.FC<OrderBookCardProps> = ({ exchange, type, orders }) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('gray.700', 'gray.600');
  const textColor = type === 'buy' ? 'green.400' : 'red.400';

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
    >
      <Flex align="center" gap={3} mb={4}>
        <Icon
          as={EXCHANGE_ICONS[exchange.toLowerCase()]}
          boxSize={6}
          color={textColor}
        />
        <Text fontSize="xl" fontWeight="bold">
          {exchange} - {type === 'buy' ? 'Compra' : 'Venda'}
        </Text>
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Preço</Th>
            <Th isNumeric>Quantidade</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={index}>
              <Td color={textColor}>{formatCurrency(order.price)}</Td>
              <Td isNumeric>{order.amount.toFixed(8)}</Td>
              <Td isNumeric>{formatCurrency(order.total)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderBookCard;