import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  Spacer,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      bg="gray.800"
      borderBottom="1px"
      borderColor="gray.700"
      py={4}
      px={8}
      position="fixed"
      width="100%"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      backdropFilter="blur(10px)"
      backgroundColor="rgba(26, 32, 44, 0.8)"
    >
      <Flex align="center" maxW="1200px" mx="auto">
        <Box ml="60">
          <Heading 
            size="md" 
            bgGradient="linear(to-r, accent.blue, accent.purple)" 
            bgClip="text"
            fontWeight="bold"
          >
            PROTONWARE
          </Heading>
        </Box>
        <Spacer />
        <IconButton
          aria-label="Alternar tema"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
        />
      </Flex>
    </Box>
  );
};

export default Header;