import React from 'react';
import {
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
} from '@chakra-ui/react';
import ArbitrageCard from './ArbitrageCard';
import { ArbitrageOpportunity } from '../../services/exchanges/types';

interface ArbitrageListProps {
  opportunities: ArbitrageOpportunity[];
  isLoading?: boolean;
  error?: string | null;
}

const ArbitrageList: React.FC<ArbitrageListProps> = ({
  opportunities,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <VStack spacing={4} align="center" py={8}>
        <Spinner size="xl" />
        <Text>Buscando oportunidades de arbitragem...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (opportunities.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        Nenhuma oportunidade de arbitragem encontrada no momento.
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {opportunities.map((opportunity, index) => (
        <ArbitrageCard
          key={index}
          symbol={opportunity.symbol}
          buyExchange={opportunity.buyExchange}
          sellExchange={opportunity.sellExchange}
          buyPrice={opportunity.buyPrice}
          sellPrice={opportunity.sellPrice}
          spread={opportunity.spread}
        />
      ))}
    </SimpleGrid>
  );
};

export default ArbitrageList;