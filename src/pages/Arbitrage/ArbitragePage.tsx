import React from 'react';
import {
  Container,
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { useArbitrageMonitor } from '../../hooks/useArbitrageMonitor';
import { useWallet } from '../../hooks/useWallet';
import ArbitrageTable from '../../components/Arbitrage/ArbitrageTable';

const ArbitragePage: React.FC = () => {
  const { assets } = useWallet();
  const symbols = assets.map(asset => asset.symbol);
  const { opportunities, isMonitoring } = useArbitrageMonitor(symbols);
  const bgColor = useColorModeValue('white', 'gray.800');

  const avgSpread = opportunities.reduce((sum, opp) => sum + opp.spread, 0) / Math.max(opportunities.length, 1);
  const maxSpread = Math.max(...opportunities.map(opp => opp.spread), 0);
  const profitableOpps = opportunities.filter(opp => opp.spread >= 1).length;

  return (
    <Container maxW="1400px" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={4}>Arbitragem de Criptomoedas</Heading>
        <Text color="gray.500">
          Monitore e execute operações de arbitragem entre diferentes exchanges
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="lg">
          <Stat>
            <StatLabel fontSize="md">Spread Médio</StatLabel>
            <StatNumber fontSize="2xl">{avgSpread.toFixed(2)}%</StatNumber>
            <StatHelpText>
              <StatArrow type={avgSpread >= 1 ? 'increase' : 'decrease'} />
              Últimas 24h
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="lg">
          <Stat>
            <StatLabel fontSize="md">Maior Spread</StatLabel>
            <StatNumber fontSize="2xl">{maxSpread.toFixed(2)}%</StatNumber>
            <StatHelpText>
              <StatArrow type={maxSpread >= 1 ? 'increase' : 'decrease'} />
              Últimas 24h
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="lg">
          <Stat>
            <StatLabel fontSize="md">Oportunidades Ativas</StatLabel>
            <StatNumber fontSize="2xl">{profitableOpps}</StatNumber>
            <StatHelpText>
              Spread maior que 1%
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="lg">
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Oportunidades de Arbitragem
            </Text>
            <Text color="gray.500" fontSize="sm">
              Atualização em tempo real
            </Text>
          </Box>
        </Flex>
        
        <Divider mb={6} />
        
        <ArbitrageTable opportunities={opportunities} />
      </Box>
    </Container>
  );
};

export default ArbitragePage;