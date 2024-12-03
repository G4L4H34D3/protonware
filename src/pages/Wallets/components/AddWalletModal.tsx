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
} from '@chakra-ui/react';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWalletModal: React.FC<AddWalletModalProps> = ({ isOpen, onClose }) => {
  const [exchange, setExchange] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add wallet integration logic here
      toast({
        title: 'Wallet Added',
        description: 'Your new wallet has been successfully connected.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} pb={6}>
              <FormControl isRequired>
                <FormLabel>Exchange</FormLabel>
                <Select
                  placeholder="Select exchange"
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
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>API Secret</FormLabel>
                <Input
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                width="full"
              >
                Add Wallet
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddWalletModal;