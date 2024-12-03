import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Stat,
  StatArrow,
} from '@chakra-ui/react';
import { formatCurrency } from '../../../utils/formatters';
import { WalletAsset } from '../../../services/wallet/types';

interface TokenCardProps {
  asset: WalletAsset;
  onClick: () => void;
  isSelected: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ asset, onClick, isSelected }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.400');

  const totalBalance = asset.balance.available + asset.balance.inOrder;
  const totalValue = totalBalance * asset.price;

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={isSelected ? selectedBorderColor : borderColor}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
      }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={3}>
          {asset.icon && <Icon as={asset.icon} boxSize={8} color="blue.500" />}
          <Box>
            <Text fontWeight="bold" fontSize="lg">{asset.name}</Text>
            <Text color="gray.500">{asset.symbol}</Text>
          </Box>
        </Flex>
        <Box textAlign="right">
          <Text fontSize="sm" color="gray.500">Balance</Text>
          <Text fontWeight="medium">{totalBalance.toFixed(8)}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" align="flex-end">
        <Box>
          <Text fontSize="sm" color="gray.500">Value</Text>
          <Text fontSize="xl" fontWeight="bold">
            {formatCurrency(totalValue)}
          </Text>
        </Box>
        <Stat>
          <Flex align="center" gap={1}>
            <StatArrow type={asset.change24h >= 0 ? 'increase' : 'decrease'} />
            <Text
              color={asset.change24h >= 0 ? 'green.500' : 'red.500'}
              fontWeight="medium"
            >
              {Math.abs(asset.change24h).toFixed(2)}%
            </Text>
          </Flex>
        </Stat>
      </Flex>
    </Box>
  );
};

export default TokenCard;