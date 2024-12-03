import React from 'react';
import {
  Box,
  Text,
  Icon,
  Flex,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreVertical, FiRefreshCw, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { formatCurrency } from '../../../utils/formatters';

const EXCHANGE_ICONS = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const EXCHANGE_COLORS = {
  binance: 'yellow.400',
  foxbit: 'orange.400',
};

interface WalletCardProps {
  exchange: string;
  data: any;
}

const WalletCard: React.FC<WalletCardProps> = ({ exchange, data }) => {
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
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={3}>
          <Icon
            as={EXCHANGE_ICONS[exchange] || SiBinance}
            boxSize={8}
            color={EXCHANGE_COLORS[exchange] || 'gray.400'}
          />
          <Box>
            <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
              {exchange}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {data.assets.length} active {data.assets.length === 1 ? 'asset' : 'assets'}
            </Text>
          </Box>
        </Flex>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
          />
          <MenuList>
            <MenuItem icon={<FiRefreshCw />}>Sync Balance</MenuItem>
            <MenuItem icon={<FiEdit2 />}>Edit API Keys</MenuItem>
            <MenuItem icon={<FiTrash2 />} color="red.500">Remove Wallet</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {formatCurrency(data.totalValue)}
      </Text>
      
      <Text color={data.totalChange24h >= 0 ? 'green.500' : 'red.500'} fontSize="sm">
        {data.totalChange24h >= 0 ? '↑' : '↓'} {Math.abs(data.totalChange24h).toFixed(2)}% (24h)
      </Text>
    </Box>
  );
};

export default WalletCard;