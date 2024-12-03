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
import AdminPage from './pages/admin/AdminPage';
import GoalsPage from './pages/GoalsPage';
import PipelinePage from './pages/PipelinePage';
import TechStackPage from './pages/TechStackPage';
import DescriptionPage from './pages/DescriptionPage';


const DRAWER_WIDTH = 240;
const MOBILE_BREAKPOINT = 'sm';

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
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: {
                xs: 0,
                sm: sidebarOpen ? DRAWER_WIDTH : 0
              },
              width: {
                xs: '100%',
                sm: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'
              },
              pl: 0
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
                width: '100%',
                mt: '64px',
                minHeight: 'calc(100vh - 64px)',
                overflow: 'auto'
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/pipeline" element={<PipelinePage />} />
                <Route path="/tech-stack" element={<TechStackPage />} />
                <Route path="/description" element={<DescriptionPage />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    keycloak.hasRealmRole('secret-admin') ? (
                      <DashboardPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/admin"
                  element={
                    keycloak.hasRealmRole('secret-admin') ? (
                      <AdminPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    keycloak.hasRealmRole('secret-admin') ? (
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