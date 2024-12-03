import React from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiPlusCircle } from 'react-icons/fi';

interface NoWalletsProps {
  onAddWallet: () => void;
}

const NoWallets: React.FC<NoWalletsProps> = ({ onAddWallet }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
    >
      <VStack spacing={4}>
        <Icon as={FiPlusCircle} boxSize={12} color="blue.500" />
        <Text fontSize="xl" fontWeight="bold">
          No Wallets Connected
        </Text>
        <Text color="gray.500" textAlign="center">
          Connect your exchange wallets to start tracking your crypto assets
        </Text>
        <Button
          colorScheme="blue"
          leftIcon={<FiPlusCircle />}
          onClick={onAddWallet}
        >
          Add Your First Wallet
        </Button>
      </VStack>
    </Box>
  );
};

export default NoWallets;