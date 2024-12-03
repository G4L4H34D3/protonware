import React from 'react';
import {
  Box,
  Text,
  Icon,
  Flex,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { API } from '../../../types/api';
import { IconType } from 'react-icons';

const EXCHANGE_ICONS: Record<string, IconType> = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const EXCHANGE_COLORS: Record<string, string> = {
  binance: 'yellow.400',
  foxbit: 'orange.400',
};

interface APICardProps {
  api: API;
}

const APICard: React.FC<APICardProps> = ({ api }) => {
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
            as={EXCHANGE_ICONS[api.exchange.toLowerCase()] || SiBinance}
            boxSize={8}
            color={EXCHANGE_COLORS[api.exchange.toLowerCase()] || 'gray.400'}
          />
          <Box>
            <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
              {api.exchange}
            </Text>
            <Badge
              colorScheme={api.isActive ? 'green' : 'red'}
              variant="subtle"
            >
              {api.isActive ? 'Ativa' : 'Inativa'}
            </Badge>
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
            <MenuItem icon={<FiRefreshCw />}>Testar Conexão</MenuItem>
            <MenuItem icon={<FiEdit2 />}>Editar Chaves</MenuItem>
            <MenuItem icon={<FiTrash2 />} color="red.500">Remover API</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box mb={4}>
        <Text color="gray.500" fontSize="sm" mb={1}>API Key</Text>
        <Text fontFamily="mono" fontSize="sm">
          {api.apiKey.slice(0, 8)}...{api.apiKey.slice(-8)}
        </Text>
      </Box>

      <Box>
        <Text color="gray.500" fontSize="sm" mb={1}>Última Verificação</Text>
        <Text fontSize="sm">
          {new Date(api.lastCheck).toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};

export default APICard;