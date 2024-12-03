import React from 'react';
import {
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

interface TransactionsFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const TransactionsFilter: React.FC<TransactionsFilterProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const buttonBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.500', 'blue.400');
  const activeColor = useColorModeValue('white', 'white');

  return (
    <HStack spacing={2} mb={6}>
      <Button
        size="sm"
        bg={activeFilter === 'all' ? activeBg : buttonBg}
        color={activeFilter === 'all' ? activeColor : undefined}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        size="sm"
        bg={activeFilter === 'buy' ? activeBg : buttonBg}
        color={activeFilter === 'buy' ? activeColor : undefined}
        onClick={() => onFilterChange('buy')}
      >
        Buy
      </Button>
      <Button
        size="sm"
        bg={activeFilter === 'sell' ? activeBg : buttonBg}
        color={activeFilter === 'sell' ? activeColor : undefined}
        onClick={() => onFilterChange('sell')}
      >
        Sell
      </Button>
    </HStack>
  );
};

export default TransactionsFilter;