import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Header />
      <Sidebar />
      <Box ml="60" pt="80px" pb={8}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;