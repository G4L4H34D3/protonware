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
  Text,
} from '@chakra-ui/react';
import { ArbitrageOpportunity } from '../../../services/exchanges/types';
import { formatCurrency } from '../../../utils/formatters';

interface ArbitrageStatsProps {
  opportunities: ArbitrageOpportunity[];
}

const ArbitrageStats: React.FC<ArbitrageStatsProps> = ({ opportunities }) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('gray.700', 'gray.600');

  const avgSpread = opportunities.reduce((sum, opp) => sum + opp.spread, 0) / Math.max(opportunities.length, 1);
  const maxSpread = Math.max(...opportunities.map(opp => opp.spread), 0);
  const totalOpportunities = opportunities.length;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box
        p={6}
        bg={bgColor}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel>Spread Médio</StatLabel>
          <StatNumber>{avgSpread.toFixed(2)}%</StatNumber>
          <StatHelpText>
            <StatArrow type={avgSpread >= 1 ? 'increase' : 'decrease'} />
            Últimas 24h
          </StatHelpText>
        </Stat>
      </Box>

      <Box
        p={6}
        bg={bgColor}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel>Maior Spread</StatLabel>
          <StatNumber>{maxSpread.toFixed(2)}%</StatNumber>
          <StatHelpText>
            <StatArrow type={maxSpread >= 1 ? 'increase' : 'decrease'} />
            Últimas 24h
          </StatHelpText>
        </Stat>
      </Box>

      <Box
        p={6}
        bg={bgColor}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel>Oportunidades Ativas</StatLabel>
          <StatNumber>{totalOpportunities}</StatNumber>
          <StatHelpText>
            <Text as="span">Spread maior que 1%</Text>
          </StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

export default ArbitrageStats;