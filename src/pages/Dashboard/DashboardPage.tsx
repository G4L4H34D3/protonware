import React from 'react';
import {
  Container,
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import ArbitrageList from '../../components/ArbitrageOpportunity/ArbitrageList';
import { useArbitrageMonitor } from '../../hooks/useArbitrageMonitor';
import { useWallet } from '../../hooks/useWallet';
import TradingStats from '../../components/Dashboard/TradingStats';
import Wallet from '../../components/Dashboard/Wallet';

const DashboardPage: React.FC = () => {
  const { assets } = useWallet();
  const symbols = assets.map(asset => asset.symbol);
  const { opportunities, isMonitoring } = useArbitrageMonitor(symbols);
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="1200px" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Box>
          <Wallet />
          <Box h="6" />
          <TradingStats />
        </Box>
        
        <Box>
          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            mb={6}
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Oportunidades de Arbitragem
            </Text>
            <ArbitrageList
              opportunities={opportunities}
              isLoading={!isMonitoring}
            />
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default DashboardPage;