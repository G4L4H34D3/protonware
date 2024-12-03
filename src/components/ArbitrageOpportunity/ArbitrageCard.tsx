import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Badge,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { formatCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface ArbitrageCardProps {
  symbol: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
}

const EXCHANGE_ICONS: { [key: string]: any } = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const ArbitrageCard: React.FC<ArbitrageCardProps> = ({
  symbol,
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  spread,
}) => {
  const navigate = useNavigate();

  const handleViewOrderBook = () => {
    navigate('/order-book', {
      state: {
        symbol,
        buyExchange,
        sellExchange,
        buyPrice,
        sellPrice,
        spread,
      },
    });
  };

  return (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor="gray.700"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        bgGradient: 'linear(to-r, accent.blue, accent.purple)',
      }}
    >
      <Flex direction="column" gap={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">{symbol}</Text>
          <Badge 
            bg="accent.green" 
            color="gray.900"
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
          >
            {spread.toFixed(2)}% Spread
          </Badge>
        </Flex>

        <Flex justify="space-between" align="center" gap={4}>
          <Box flex={1}>
            <Flex align="center" gap={2} mb={2}>
              <Icon as={EXCHANGE_ICONS[buyExchange.toLowerCase()]} boxSize={6} />
              <Text fontWeight="medium" textTransform="capitalize">{buyExchange}</Text>
            </Flex>
            <Text fontSize="lg" color="accent.green" fontWeight="bold">
              COMPRA
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(buyPrice)}
            </Text>
          </Box>

          <Box flex={1}>
            <Flex align="center" gap={2} mb={2}>
              <Icon as={EXCHANGE_ICONS[sellExchange.toLowerCase()]} boxSize={6} />
              <Text fontWeight="medium" textTransform="capitalize">{sellExchange}</Text>
            </Flex>
            <Text fontSize="lg" color="accent.red" fontWeight="bold">
              VENDA
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(sellPrice)}
            </Text>
          </Box>
        </Flex>

        <Button
          size="lg"
          onClick={handleViewOrderBook}
          w="100%"
          bgGradient="linear(to-r, accent.blue, accent.purple)"
          _hover={{
            bgGradient: "linear(to-r, brand.400, accent.purple)",
          }}
        >
          Order Book
        </Button>
      </Flex>
    </Box>
  );
};

export default ArbitrageCard;