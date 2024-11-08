import { useMemo, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useThemeStore from './store/themeStore';
import keycloak from './keycloak';

function App() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    keycloak
      .init({ onLoad: 'check-sso' })
      .then((authenticated) => {
        setKeycloakInitialized(true);
      })
      .catch((error) => {
        console.error('Ошибка инициализации Keycloak:', error);
      });
  }, []);

  if (!keycloakInitialized) {
    return <div>Загрузка...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      берба
    </ThemeProvider>
  );
}

export default App;
