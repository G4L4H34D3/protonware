import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import TradingStats from './TradingStats';
import PriceChart from './PriceChart';
import TradingPairs from './TradingPairs';
import Wallet from './Wallet';

const Dashboard: React.FC = () => {
  return (
    <Container maxW="1200px" py={8}>
      <Wallet />
      <Box h="8" />
      <TradingStats />
      <Box h="8" />
      <PriceChart />
      <Box h="8" />
      <TradingPairs />
    </Container>
  );
};

export default Dashboard;