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
import Adminka from './pages/admin/Adminka';


const DRAWER_WIDTH = 280;

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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: mode === 'light'
              ? 'radial-gradient(#bdbdbd 1px, transparent 1px)'
              : 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '15px 15px',
          },
        },
      },
    },
    typography: {
      h3: {
        fontSize: '1.8rem',
      },
      h4: {
        fontSize: '1.5rem',
      },
      h5: {
        fontSize: '1.2rem',
      },
      body1: {
        fontSize: '0.875rem',
      },
      body2: {
        fontSize: '0.75rem',
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
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              marginLeft: sidebarOpen ? `${DRAWER_WIDTH - 100}px` : 0,
              width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH - 100 : 0}px)`,
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
                display: 'flex',
                width: '100%',
                p: 3,
                mt: 8,
                justifyContent: 'flex-start',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '1000px',
                  minHeight: 'calc(100vh - 80px)',
                  display: 'flex',
                  gap: 3,
                  mx: 0,
                  transition: 'margin 0.3s ease-in-out',
                  ml: sidebarOpen ? '-100px' : '-200px',
                  mr: 'auto',
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
                    path="/admin/adminka"
                    element={
                      keycloak.hasRealmRole('admin') ? (
                        <Adminka />
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
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;