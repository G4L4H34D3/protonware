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
import APICard from './components/APICard';
import AddAPIModal from './components/AddAPIModal';
import NoAPIs from './components/NoAPIs';
import { useAPIs } from '../../hooks/useAPIs';

const APIsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { apis, isLoading } = useAPIs();

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
            Adicionar Nova API
          </Button>
        </Box>

        {apis.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {apis.map((api) => (
              <APICard
                key={api.id}
                api={api}
              />
            ))}
          </SimpleGrid>
        ) : (
          <NoAPIs onAddAPI={onOpen} />
        )}

        <AddAPIModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Container>
  );
};

export default APIsPage;