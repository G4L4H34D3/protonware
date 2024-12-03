import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E5F4FF',
      100: '#B8E1FF',
      200: '#8ACDFF',
      300: '#5CB9FF',
      400: '#2EA5FF',
      500: '#0091FF',
      600: '#0074CC',
      700: '#005799',
      800: '#003A66',
      900: '#001D33',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    accent: {
      green: '#00F7BF',
      purple: '#9F7AEA',
      blue: '#00B7FF',
      red: '#FF5757',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        _focus: {
          boxShadow: 'none',
        },
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'accent.blue' : 'blue.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'blue.600',
            _disabled: {
              bg: props.colorMode === 'dark' ? 'brand.400' : 'blue.600',
            },
          },
        }),
        ghost: {
          _hover: {
            bg: 'whiteAlpha.200',
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          borderRadius: 'xl',
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
      }),
    },
    Table: {
      variants: {
        simple: (props: any) => ({
          th: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
            color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
          },
          td: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          },
        }),
      },
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        },
      }),
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
        item: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        },
      }),
    },
    Tabs: {
      variants: {
        enclosed: (props: any) => ({
          tab: {
            _selected: {
              bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
              color: props.colorMode === 'dark' ? 'white' : 'gray.800',
            },
          },
          tablist: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          },
          tabpanel: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          },
        }),
      },
    },
  },
});

export default theme;