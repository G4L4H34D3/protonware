import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Flex,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { formatCurrency } from '../../utils/formatters';
import { OrderBookEntry, OrderBook } from '../../types/orderBook';

interface OrderBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  exchange: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

const EXCHANGE_ICONS: { [key: string]: any } = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const OrderBookModal: React.FC<OrderBookModalProps> = ({
  isOpen,
  onClose,
  symbol,
  exchange,
  bids,
  asks,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const totalBidLiquidity = bids.reduce((sum, bid) => sum + bid.liquidity, 0);
  const totalAskLiquidity = asks.reduce((sum, ask) => sum + ask.liquidity, 0);

  const getLiquidityPercentage = (liquidity: number, isAsk: boolean) => {
    const total = isAsk ? totalAskLiquidity : totalBidLiquidity;
    return (liquidity / total) * 100;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <Flex align="center" gap={2}>
            <Icon
              as={EXCHANGE_ICONS[exchange.toLowerCase()]}
              boxSize={6}
              color={exchange.toLowerCase() === 'binance' ? 'yellow.400' : 'orange.400'}
            />
            <Text>Order Book - {symbol}</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SimpleGrid columns={2} spacing={4}>
            {/* Bids (Buy Orders) */}
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2} color="green.400">
                Ordens de Compra
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Liquidez Total: {formatCurrency(totalBidLiquidity)}
              </Text>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Preço</Th>
                    <Th isNumeric>Liquidez</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bids.slice(0, 8).map((bid, index) => (
                    <Tr key={index}>
                      <Td position="relative">
                        <Progress
                          value={getLiquidityPercentage(bid.liquidity, false)}
                          size="sm"
                          colorScheme="green"
                          opacity={0.2}
                          position="absolute"
                          top={0}
                          bottom={0}
                          right={0}
                          left={0}
                          borderRadius="sm"
                        />
                        <Text color="green.400" fontWeight="medium" position="relative">
                          {formatCurrency(bid.price)}
                        </Text>
                      </Td>
                      <Td isNumeric position="relative">
                        <Text fontWeight="medium" position="relative">
                          {formatCurrency(bid.liquidity)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {/* Asks (Sell Orders) */}
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2} color="red.400">
                Ordens de Venda
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Liquidez Total: {formatCurrency(totalAskLiquidity)}
              </Text>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Preço</Th>
                    <Th isNumeric>Liquidez</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {asks.slice(0, 8).map((ask, index) => (
                    <Tr key={index}>
                      <Td position="relative">
                        <Progress
                          value={getLiquidityPercentage(ask.liquidity, true)}
                          size="sm"
                          colorScheme="red"
                          opacity={0.2}
                          position="absolute"
                          top={0}
                          bottom={0}
                          right={0}
                          left={0}
                          borderRadius="sm"
                        />
                        <Text color="red.400" fontWeight="medium" position="relative">
                          {formatCurrency(ask.price)}
                        </Text>
                      </Td>
                      <Td isNumeric position="relative">
                        <Text fontWeight="medium" position="relative">
                          {formatCurrency(ask.liquidity)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderBookModal;