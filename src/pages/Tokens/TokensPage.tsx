import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  useColorModeValue,
  Icon,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import TokenCard from './components/TokenCard';
import TokenChart from './components/TokenChart';
import { formatCurrency } from '../../utils/formatters';
import { useWallet } from '../../hooks/useWallet';
import { WalletAsset } from '../../services/wallet/types';

const TokensPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState<WalletAsset | null>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { assets, isLoading, error, totalValue, totalChange24h } = useWallet();

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Container maxW="1200px" py={8}>
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="1200px" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="1200px" py={8}>
      <Flex direction="column" gap={6}>
        {/* Portfolio Summary */}
        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <Stat>
            <StatLabel fontSize="lg" fontWeight="medium">Portfolio Total</StatLabel>
            <StatNumber fontSize="3xl">{formatCurrency(totalValue)}</StatNumber>
            <StatHelpText fontSize="md">
              <StatArrow type={totalChange24h >= 0 ? 'increase' : 'decrease'} />
              {Math.abs((totalChange24h / totalValue) * 100).toFixed(2)}% (24h)
            </StatHelpText>
          </Stat>
        </Box>

        {/* Search Bar */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          />
        </InputGroup>

        {/* Token Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredAssets.map((asset) => (
            <TokenCard
              key={asset.id}
              asset={asset}
              onClick={() => setSelectedToken(asset)}
              isSelected={selectedToken?.id === asset.id}
            />
          ))}
        </SimpleGrid>

        {/* Selected Token Chart */}
        {selectedToken && (
          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px"
            borderColor={borderColor}
          >
            <TokenChart asset={selectedToken} />
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default TokensPage;