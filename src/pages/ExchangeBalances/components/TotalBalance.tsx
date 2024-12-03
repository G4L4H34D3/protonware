import React from 'react';
import {
  Box,
  Text,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
} from '@chakra-ui/react';
import { formatCurrency } from '../../../utils/formatters';

interface TotalBalanceProps {
  totalValue: number;
  totalChange24h: number;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ totalValue, totalChange24h }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Stat>
          <StatLabel fontSize="lg" fontWeight="medium">Total Portfolio Value</StatLabel>
          <StatNumber fontSize="3xl">{formatCurrency(totalValue)}</StatNumber>
          <StatHelpText fontSize="md">
            <StatArrow type={totalChange24h >= 0 ? 'increase' : 'decrease'} />
            {Math.abs((totalChange24h / totalValue) * 100).toFixed(2)}% (24h)
          </StatHelpText>
        </Stat>
        
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Your portfolio is distributed across multiple exchanges. Monitor your balances
            and track performance for each exchange below.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default TotalBalance;