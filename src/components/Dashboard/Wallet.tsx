import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  Divider,
} from '@chakra-ui/react';
import { FiDollarSign, FiPlusCircle, FiExternalLink } from 'react-icons/fi';
import { SiBitcoin, SiEthereum } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

interface WalletCardProps {
  title: string;
  amount: string;
  symbol: string;
  icon: React.ComponentType;
}

const WalletCard = ({ title, amount, symbol, icon }: WalletCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-2px)' }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Icon as={icon} boxSize={6} color="blue.500" />
        <Text fontSize="sm" color="gray.500">{title}</Text>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        {amount} <Text as="span" fontSize="lg" color="gray.500">{symbol}</Text>
      </Text>
    </Box>
  );
};

const Wallet = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();

  const handleAddFunds = () => {
    navigate('/wallets');
  };

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      shadow="lg"
      mb={6}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="bold">Minha Carteira</Text>
        <Button
          leftIcon={<FiPlusCircle />}
          rightIcon={<FiExternalLink />}
          colorScheme="blue"
          size="sm"
          onClick={handleAddFunds}
        >
          Adicionar Fundos
        </Button>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <WalletCard
          title="Bitcoin"
          amount="0.2458"
          symbol="BTC"
          icon={SiBitcoin}
        />
        <WalletCard
          title="Ethereum"
          amount="3.8945"
          symbol="ETH"
          icon={SiEthereum}
        />
        <WalletCard
          title="Saldo em Dólar"
          amount="12,458.36"
          symbol="USD"
          icon={FiDollarSign}
        />
      </SimpleGrid>

      <Divider my={6} />

      <Flex justify="space-between" align="center">
        <Text color="gray.500" fontSize="sm">
          Valor Total Estimado
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          R$ 156.842,50
        </Text>
      </Flex>
    </Box>
  );
};

export default Wallet;