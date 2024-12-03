import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface AddAPIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAPIModal: React.FC<AddAPIModalProps> = ({ isOpen, onClose }) => {
  const [exchange, setExchange] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add API integration logic here
      toast({
        title: 'API Adicionada',
        description: 'Suas chaves de API foram adicionadas com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar as chaves de API. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Nova API</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Text fontSize="sm">
              Certifique-se de habilitar as permissões de leitura e escrita para as operações de arbitragem.
            </Text>
          </Alert>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} pb={6}>
              <FormControl isRequired>
                <FormLabel>Exchange</FormLabel>
                <Select
                  placeholder="Selecione a exchange"
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                >
                  <option value="binance">Binance</option>
                  <option value="foxbit">Foxbit</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>API Key</FormLabel>
                <Input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Cole sua API Key aqui"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>API Secret</FormLabel>
                <Input
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  placeholder="Cole seu API Secret aqui"
                />
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                width="full"
              >
                Adicionar API
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddAPIModal;