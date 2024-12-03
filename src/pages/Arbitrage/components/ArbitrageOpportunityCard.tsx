import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { ArbitrageOpportunity } from '../../../services/exchanges/types';
import { formatCurrency } from '../../../utils/formatters';

interface ArbitrageOpportunityCardProps {
  opportunity: ArbitrageOpportunity;
}

const EXCHANGE_ICONS: { [key: string]: any } = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const ArbitrageOpportunityCard: React.FC<ArbitrageOpportunityCardProps> = ({ opportunity }) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('gray.700', 'gray.600');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        bgGradient: 'linear(to-r, purple.500, blue.500)',
      }}
    >
      <Flex direction="column" gap={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">{opportunity.symbol}</Text>
          <Badge 
            colorScheme="green" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
          >
            {opportunity.spread.toFixed(2)}% Spread
          </Badge>
        </Flex>

        <Flex justify="space-between" gap={4}>
          <Box flex={1}>
            <Flex align="center" gap={2} mb={2}>
              <Icon 
                as={EXCHANGE_ICONS[opportunity.buyExchange.toLowerCase()]} 
                boxSize={6} 
              />
              <Text fontWeight="medium" textTransform="capitalize">
                {opportunity.buyExchange}
              </Text>
            </Flex>
            <Text color="green.400" fontWeight="bold">COMPRA</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(opportunity.buyPrice)}
            </Text>
          </Box>

          <Box flex={1}>
            <Flex align="center" gap={2} mb={2}>
              <Icon 
                as={EXCHANGE_ICONS[opportunity.sellExchange.toLowerCase()]} 
                boxSize={6} 
              />
              <Text fontWeight="medium" textTransform="capitalize">
                {opportunity.sellExchange}
              </Text>
            </Flex>
            <Text color="red.400" fontWeight="bold">VENDA</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(opportunity.sellPrice)}
            </Text>
          </Box>
        </Flex>

        <Button
          size="lg"
          bgGradient="linear(to-r, purple.500, blue.500)"
          _hover={{
            bgGradient: "linear(to-r, purple.600, blue.600)",
          }}
          onClick={() => {}}
        >
          Order Book
        </Button>
      </Flex>
    </Box>
  );
};

export default ArbitrageOpportunityCard;