import React from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiKey } from 'react-icons/fi';

interface NoAPIsProps {
  onAddAPI: () => void;
}

const NoAPIs: React.FC<NoAPIsProps> = ({ onAddAPI }) => {
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
        <Icon as={FiKey} boxSize={12} color="blue.500" />
        <Text fontSize="xl" fontWeight="bold">
          Nenhuma API Configurada
        </Text>
        <Text color="gray.500" textAlign="center">
          Adicione suas chaves de API para começar a monitorar as exchanges
        </Text>
        <Button
          colorScheme="blue"
          onClick={onAddAPI}
        >
          Adicionar Primeira API
        </Button>
      </VStack>
    </Box>
  );
};

export default NoAPIs;