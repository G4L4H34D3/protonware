import React from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Button,
  useColorModeValue,
  Icon,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useWalletManager } from '../../hooks/useWalletManager';
import WalletCard from './components/WalletCard';
import AddWalletModal from './components/AddWalletModal';
import NoWallets from './components/NoWallets';

const WalletsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { summary, isLoading } = useWalletManager();
  const exchanges = Object.keys(summary.exchanges);

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="blue"
            onClick={onOpen}
            mb={6}
          >
            Add New Wallet
          </Button>
        </Box>

        {exchanges.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {exchanges.map((exchange) => (
              <WalletCard
                key={exchange}
                exchange={exchange}
                data={summary.exchanges[exchange]}
              />
            ))}
          </SimpleGrid>
        ) : (
          <NoWallets onAddWallet={onOpen} />
        )}

        <AddWalletModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Container>
  );
};

export default WalletsPage;