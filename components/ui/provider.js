import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

export function Provider({ children }) {
  return (
    <ChakraProvider>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
