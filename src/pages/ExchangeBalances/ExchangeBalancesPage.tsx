import React from 'react';
import {
  Container,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { useWallet } from '../../hooks/useWallet';
import ExchangeCard from './components/ExchangeCard';
import TotalBalance from './components/TotalBalance';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';

const ExchangeBalancesPage: React.FC = () => {
  const { assets, totalValue, totalChange24h } = useWallet();

  // Group assets by exchange
  const exchangeBalances = {
    binance: assets,
    foxbit: [] // Will be implemented when Foxbit integration is ready
  };

  const exchanges = [
    {
      name: 'Binance',
      icon: SiBinance,
      assets: exchangeBalances.binance,
      color: 'yellow.400'
    },
    {
      name: 'Foxbit',
      icon: SiBitcoinsv,
      assets: exchangeBalances.foxbit,
      color: 'orange.400'
    }
  ];

  return (
    <Container maxW="1200px" py={8}>
      <Flex direction="column" gap={6}>
        <TotalBalance
          totalValue={totalValue}
          totalChange24h={totalChange24h}
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {exchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.name}
              exchange={exchange}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default ExchangeBalancesPage;