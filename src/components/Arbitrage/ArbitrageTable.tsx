import React, { useState } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Icon,
  Badge,
  Flex,
  Button,
  useColorModeValue,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Select,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { FiPlay } from 'react-icons/fi';
import { SiBinance, SiBitcoinsv } from 'react-icons/si';
import { ArbitrageOpportunity } from '../../services/exchanges/types';
import { formatCurrency } from '../../utils/formatters';
import OrderBookModal from '../OrderBook/OrderBookModal';
import { useOrderBook } from '../../hooks/useOrderBook';
import { useArbitrageExecutor } from '../../hooks/useArbitrageExecutor';
import { useWalletManager } from '../../hooks/useWalletManager';

interface ArbitrageTableProps {
  opportunities: ArbitrageOpportunity[];
}

const EXCHANGE_ICONS: { [key: string]: any } = {
  binance: SiBinance,
  foxbit: SiBitcoinsv,
};

const ArbitrageTable: React.FC<ArbitrageTableProps> = ({ opportunities }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);
  const [executingArbitrage, setExecutingArbitrage] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const toast = useToast();
  
  const { executeArbitrage } = useArbitrageExecutor();
  const { summary } = useWalletManager();
  const { orderBook } = useOrderBook(
    selectedOpportunity?.symbol || '',
    selectedOpportunity?.buyExchange || ''
  );

  const availableWallets = Object.entries(summary.exchanges).map(([exchange, data]) => ({
    exchange,
    balance: data.totalValue
  }));

  const selectedWalletBalance = selectedWallet 
    ? summary.exchanges[selectedWallet]?.totalValue || 0 
    : 0;

  const handleExecuteArbitrage = async (opportunity: ArbitrageOpportunity) => {
    if (!selectedWallet) {
      toast({
        title: 'Carteira não selecionada',
        description: 'Selecione uma carteira para executar a arbitragem',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (investmentAmount <= 0) {
      toast({
        title: 'Valor inválido',
        description: 'O valor do investimento deve ser maior que zero',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (investmentAmount > selectedWalletBalance) {
      toast({
        title: 'Saldo insuficiente',
        description: `Saldo disponível: ${formatCurrency(selectedWalletBalance)}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setExecutingArbitrage(opportunity.symbol);
      await executeArbitrage({
        ...opportunity,
        amount: investmentAmount,
        sourceWallet: selectedWallet
      });
      
      toast({
        title: 'Arbitragem executada com sucesso!',
        description: `${opportunity.symbol}: Compra em ${opportunity.buyExchange} e venda em ${opportunity.sellExchange}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao executar arbitragem',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setExecutingArbitrage(null);
    }
  };

  const calculatePotentialProfit = (opportunity: ArbitrageOpportunity): number => {
    const profit = (opportunity.sellPrice - opportunity.buyPrice) * (investmentAmount / opportunity.buyPrice);
    return profit;
  };

  return (
    <>
      <Box mb={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="600px">
          <FormControl isRequired>
            <FormLabel>Carteira</FormLabel>
            <Select
              placeholder="Selecione uma carteira"
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
            >
              {availableWallets.map(({ exchange, balance }) => (
                <option key={exchange} value={exchange}>
                  {exchange.toUpperCase()} - Saldo: {formatCurrency(balance)}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Valor do Investimento</FormLabel>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <NumberInput
                value={investmentAmount}
                onChange={(_, value) => setInvestmentAmount(value)}
                min={0}
                max={selectedWalletBalance}
                step={100}
                precision={2}
                width="100%"
              >
                <NumberInputField borderLeftRadius={0} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        {selectedWallet && investmentAmount > selectedWalletBalance && (
          <Alert status="error" mt={4} borderRadius="md">
            <AlertIcon />
            Saldo insuficiente na carteira selecionada
          </Alert>
        )}
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {opportunities.map((opportunity) => (
          <Card
            key={`${opportunity.symbol}-${opportunity.buyExchange}-${opportunity.sellExchange}`}
            bg={bgColor}
            borderColor={borderColor}
            borderWidth="1px"
            cursor="pointer"
            onClick={() => setSelectedOpportunity(opportunity)}
            _hover={{ transform: 'translateY(-2px)', transition: 'transform 0.2s' }}
          >
            <CardBody>
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold">{opportunity.symbol}</Text>
                  <Badge
                    colorScheme={opportunity.spread >= 2 ? 'green' : 'yellow'}
                    fontSize="md"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {opportunity.spread.toFixed(2)}% Spread
                  </Badge>
                </Flex>

                <Box>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon
                      as={EXCHANGE_ICONS[opportunity.buyExchange.toLowerCase()]}
                      boxSize={5}
                    />
                    <Text>Compra em {opportunity.buyExchange}</Text>
                  </Flex>
                  <Text color="green.400" fontSize="xl" fontWeight="bold">
                    {formatCurrency(opportunity.buyPrice)}
                  </Text>
                </Box>

                <Box>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon
                      as={EXCHANGE_ICONS[opportunity.sellExchange.toLowerCase()]}
                      boxSize={5}
                    />
                    <Text>Venda em {opportunity.sellExchange}</Text>
                  </Flex>
                  <Text color="red.400" fontSize="xl" fontWeight="bold">
                    {formatCurrency(opportunity.sellPrice)}
                  </Text>
                </Box>

                <Divider />

                <Box>
                  <Text color="gray.500" mb={1}>Lucro Estimado</Text>
                  <Text color="green.400" fontSize="xl" fontWeight="bold">
                    {formatCurrency(calculatePotentialProfit(opportunity))}
                  </Text>
                </Box>

                <Button
                  colorScheme="blue"
                  leftIcon={<FiPlay />}
                  isLoading={executingArbitrage === opportunity.symbol}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExecuteArbitrage(opportunity);
                  }}
                  isDisabled={!selectedWallet || investmentAmount > selectedWalletBalance}
                >
                  Executar Arbitragem
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {selectedOpportunity && orderBook && (
        <OrderBookModal
          isOpen={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          symbol={selectedOpportunity.symbol}
          exchange={selectedOpportunity.buyExchange}
          bids={orderBook.bids}
          asks={orderBook.asks}
        />
      )}
    </>
  );
};

export default ArbitrageTable;