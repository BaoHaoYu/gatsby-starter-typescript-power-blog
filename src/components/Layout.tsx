import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout as L1 } from './Layout/index';
import { darkTheme, lightTheme } from '../theme';

const Layout = ({ children }: { children: any }) => {
  const stored = typeof window !== 'undefined' && localStorage.getItem('isDarkMode');
  const [isDarkMode] = useState(stored === 'true' ? true : false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <L1>{children}</L1>
    </ThemeProvider>
  );
};

export { Layout };
