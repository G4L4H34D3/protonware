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
  Divider,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSignUpClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const bgColor = useColorModeValue('white', 'gray.800');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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

          {error && (
            <Text color="red.500" fontSize="sm">
              {t('invalidCredentials')}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isLoading}
          >
            {t('login')}
          </Button>

          <Divider />

          <VStack spacing={2} width="100%">
            <Text color="gray.500" fontSize="sm">
              {t('noAccount')}
            </Text>
            <Button
              variant="outline"
              colorScheme="blue"
              width="100%"
              onClick={onSignUpClick}
            >
              {t('signUp')}
            </Button>
          </VStack>
        </VStack>
      </form>
    </Box>
  );
};