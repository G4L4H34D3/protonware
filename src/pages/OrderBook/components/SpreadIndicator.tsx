import React from 'react';
import {
  Box,
  Text,
  Flex,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';
import { formatCurrency } from '../../../utils/formatters';

interface SpreadIndicatorProps {
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
}

const EXCHANGE_ICONS = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const SpreadIndicator: React.FC<SpreadIndicatorProps> = ({
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  spread,
}) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('gray.700', 'gray.600');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Oportunidade de Arbitragem
      </Text>

      <Flex align="center" justify="space-between" gap={4}>
        <Box flex={1}>
          <Flex align="center" gap={2} mb={2}>
            <Icon
              as={EXCHANGE_ICONS[buyExchange.toLowerCase()]}
              boxSize={6}
              color="green.400"
            />
            <Text fontWeight="medium">{buyExchange}</Text>
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" color="green.400">
            {formatCurrency(buyPrice)}
          </Text>
        </Box>

        <Flex direction="column" align="center">
          <Icon as={FiArrowRight} boxSize={6} color="gray.500" />
          <Badge
            colorScheme="green"
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
            mt={2}
          >
            {spread.toFixed(2)}% Spread
          </Badge>
        </Flex>

        <Box flex={1} textAlign="right">
          <Flex align="center" justify="flex-end" gap={2} mb={2}>
            <Text fontWeight="medium">{sellExchange}</Text>
            <Icon
              as={EXCHANGE_ICONS[sellExchange.toLowerCase()]}
              boxSize={6}
              color="red.400"
            />
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" color="red.400">
            {formatCurrency(sellPrice)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SpreadIndicator;