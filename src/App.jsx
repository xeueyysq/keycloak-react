import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  useMediaQuery,
  CssBaseline
} from '@mui/material';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import keycloak from './keycloak';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#283046',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    body1: {
      fontSize: '1.1rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      localStorage.setItem('theme', defaultTheme);
      setMode(defaultTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#283046',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#fff' : '#646464',
        paper: mode === 'light' ? '#fff' : '#323232',
      },
    },
    typography: {
      body1: {
        fontSize: '1.1rem',
      },
      body2: {
        fontSize: '1rem',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <NavBar 
              onMenuClick={handleSidebarToggle} 
              sidebarOpen={sidebarOpen}
              toggleTheme={toggleColorMode}
              isDarkMode={mode === 'dark'}
            />
            <Box
              sx={{
                p: 3,
                mt: 10,
                minHeight: 'calc(100vh - 80px)',
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/admin"
                  element={
                    keycloak.hasRealmRole('admin') ? (
                      <DashboardPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    keycloak.hasRealmRole('admin') ? (
                      <UsersPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    keycloak.authenticated ? (
                      <ProfilePage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;