import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { LoginForm } from '../../components/Auth/LoginForm';
import { SignUpForm } from '../../components/Auth/SignUpForm';
import { LanguageSelector } from '../../components/Language/LanguageSelector';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { t } = useTranslation();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
    >
      <Box position="absolute" top={4} right={4}>
        <LanguageSelector />
      </Box>
      
      <Container maxW="lg">
        <VStack spacing={8} align="center">
          <VStack spacing={2} textAlign="center">
            <Heading size="xl">{t('welcome')}</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {t('signInMessage')}
            </Text>
          </VStack>
          
          {isSignUp ? (
            <SignUpForm onCancel={() => setIsSignUp(false)} />
          ) : (
            <LoginForm onSignUpClick={() => setIsSignUp(true)} />
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;