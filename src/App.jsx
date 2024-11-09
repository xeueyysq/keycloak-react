import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import keycloak from './keycloak';
import { ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

const theme = createTheme({
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/user"
              element={
                keycloak.authenticated && keycloak.hasRealmRole('user') ? (
                  <UserPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                keycloak.hasRealmRole('admin') ? (
                  <AdminPage />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;