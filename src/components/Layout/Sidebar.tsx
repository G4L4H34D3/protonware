import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiHome, FiCodesandbox, FiKey, FiRepeat, FiDollarSign, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';

interface NavItemProps {
  icon: any;
  children: React.ReactNode;
  to: string;
}

const NavItem = ({ icon, children, to }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue('purple.50', 'purple.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeColor = useColorModeValue('purple.600', 'purple.200');

  return (
    <Link to={to}>
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : undefined}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
        }}
        borderRadius="lg"
      >
        <Icon
          mr="4"
          boxSize="4"
          as={icon}
          transition=".15s ease"
        />
        <Text fontSize="sm">{children}</Text>
      </Flex>
    </Link>
  );
};

const Sidebar = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={borderColor}
      w="60"
      pt="20"
    >
      <VStack spacing="1" align="stretch" px="2">
        <NavItem icon={FiHome} to="/">
          Início
        </NavItem>
        <NavItem icon={FiTrendingUp} to="/arbitrage">
          Arbitragem
        </NavItem>
        <NavItem icon={FiCodesandbox} to="/tokens">
          Tokens
        </NavItem>
        <NavItem icon={FiDollarSign} to="/balances">
          Saldos
        </NavItem>
        <NavItem icon={FiCreditCard} to="/wallets">
          Carteiras
        </NavItem>
        <NavItem icon={FiKey} to="/apis">
          APIs
        </NavItem>
        <NavItem icon={FiRepeat} to="/transactions">
          Transações
        </NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;