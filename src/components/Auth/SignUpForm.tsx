import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';

interface SignUpFormProps {
  onCancel: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, error } = useAuthStore();
  const bgColor = useColorModeValue('white', 'gray.800');
  const { t } = useTranslation();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('passwordsDontMatch'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await signUp(name, email, password);
      toast({
        title: t('signUpSuccess'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t('signUpError'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      maxW="400px"
      w="100%"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>{t('name')}</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('enterName')}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{t('email')}</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('enterEmail')}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{t('password')}</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enterPassword')}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{t('confirmPassword')}</FormLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('confirmPassword')}
            />
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isLoading}
          >
            {t('signUp')}
          </Button>

          <Button
            variant="ghost"
            width="100%"
            onClick={onCancel}
          >
            {t('login')}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};