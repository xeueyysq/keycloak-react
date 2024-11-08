import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useThemeStore from './store/themeStore';

function App() {
  const darkMode = useThemeStore((state) => state.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      берба
    </ThemeProvider>
  );
}

export default App;
