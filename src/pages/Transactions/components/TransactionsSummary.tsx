import React from 'react';
import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import { Transaction } from '../../../types/transaction';
import { formatCurrency } from '../../../utils/formatters';

interface TransactionsSummaryProps {
  transactions: Transaction[];
}

const TransactionsSummary: React.FC<TransactionsSummaryProps> = ({ transactions }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const totalVolume = transactions.reduce(
    (sum, t) => sum + t.amount * t.price,
    0
  );

  const profitLoss = transactions.reduce((sum, t) => {
    if (t.type === 'sell') {
      return sum + (t.price - t.buyPrice) * t.amount;
    }
    return sum;
  }, 0);

  const successRate = transactions.length > 0
    ? (transactions.filter(t => t.status === 'completed').length / transactions.length) * 100
    : 0;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
      <Box p={4} bg={bgColor} borderRadius="lg">
        <Stat>
          <StatLabel>Total Volume</StatLabel>
          <StatNumber>{formatCurrency(totalVolume)}</StatNumber>
          <StatHelpText>
            {transactions.length} transactions
          </StatHelpText>
        </Stat>
      </Box>

      <Box p={4} bg={bgColor} borderRadius="lg">
        <Stat>
          <StatLabel>Profit/Loss</StatLabel>
          <StatNumber>{formatCurrency(profitLoss)}</StatNumber>
          <StatHelpText>
            <StatArrow type={profitLoss >= 0 ? 'increase' : 'decrease'} />
            {Math.abs(profitLoss / totalVolume * 100).toFixed(2)}%
          </StatHelpText>
        </Stat>
      </Box>

      <Box p={4} bg={bgColor} borderRadius="lg">
        <Stat>
          <StatLabel>Success Rate</StatLabel>
          <StatNumber>{successRate.toFixed(1)}%</StatNumber>
          <StatHelpText>
            {transactions.filter(t => t.status === 'completed').length} successful
          </StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

export default TransactionsSummary;