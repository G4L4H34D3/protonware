import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { formatCurrency } from '../../../utils/formatters';

interface ExchangeCardProps {
  exchange: {
    name: string;
    icon: any;
    assets: any[];
    color: string;
  };
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ exchange }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const totalValue = exchange.assets.reduce(
    (sum, asset) => sum + (asset.balance.available + asset.balance.inOrder) * asset.price,
    0
  );

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
    >
      <Flex align="center" gap={3} mb={4}>
        <Icon as={exchange.icon} boxSize={8} color={exchange.color} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">{exchange.name}</Text>
          <Text color="gray.500" fontSize="sm">
            {exchange.assets.length} active {exchange.assets.length === 1 ? 'asset' : 'assets'}
          </Text>
        </Box>
      </Flex>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {formatCurrency(totalValue)}
      </Text>

      {exchange.assets.length > 0 ? (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th isNumeric>Balance</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exchange.assets.map((asset) => (
              <Tr key={asset.id}>
                <Td>
                  <Flex align="center" gap={2}>
                    {asset.icon && <Icon as={asset.icon} boxSize={4} />}
                    <Text>{asset.symbol}</Text>
                  </Flex>
                </Td>
                <Td isNumeric>{(asset.balance.available + asset.balance.inOrder).toFixed(8)}</Td>
                <Td isNumeric>
                  {formatCurrency((asset.balance.available + asset.balance.inOrder) * asset.price)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Flex
          justify="center"
          align="center"
          h="200px"
          borderRadius="lg"
          bg={useColorModeValue('gray.50', 'gray.700')}
        >
          <Text color="gray.500">No assets found</Text>
        </Flex>
      )}
    </Box>
  );
};

export default ExchangeCard;