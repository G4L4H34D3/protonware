import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useColorModeValue,
  Badge,
  Text,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface TradingPair {
  symbol: string;
  price: string;
  spread: string;
  status: 'active' | 'paused';
  change: number;
  volume: string;
}

const TradingPairs = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  const pairs: TradingPair[] = [
    { 
      symbol: 'BTC/USDT',
      price: '46.235,00',
      spread: '0,12',
      status: 'active',
      change: 2.34,
      volume: '1,2M'
    },
    {
      symbol: 'ETH/USDT',
      price: '2.415,00',
      spread: '0,08',
      status: 'active',
      change: -1.2,
      volume: '856K'
    },
    {
      symbol: 'BNB/USDT',
      price: '308,50',
      spread: '0,15',
      status: 'paused',
      change: 0.45,
      volume: '234K'
    },
  ];

  const statusTranslations = {
    active: 'ativo',
    paused: 'pausado'
  };

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      shadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-2px)' }}
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>Pares de Trading Ativos</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Par</Th>
            <Th>Preço</Th>
            <Th>Variação 24h</Th>
            <Th>Volume</Th>
            <Th>Spread (%)</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pairs.map((pair) => (
            <Tr key={pair.symbol}>
              <Td fontWeight="medium">{pair.symbol}</Td>
              <Td>R$ {pair.price}</Td>
              <Td>
                <HStack spacing={1}>
                  <Icon
                    as={pair.change >= 0 ? FiArrowUp : FiArrowDown}
                    color={pair.change >= 0 ? 'green.500' : 'red.500'}
                  />
                  <Text color={pair.change >= 0 ? 'green.500' : 'red.500'}>
                    {Math.abs(pair.change)}%
                  </Text>
                </HStack>
              </Td>
              <Td>{pair.volume}</Td>
              <Td>{pair.spread}%</Td>
              <Td>
                <Badge
                  colorScheme={pair.status === 'active' ? 'green' : 'yellow'}
                  borderRadius="full"
                  px={2}
                  py={1}
                >
                  {statusTranslations[pair.status]}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TradingPairs;