import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';
import {
  AccountCircle,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import keycloak from '../keycloak';

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        keycloak.login();
        handleClose();
    };

    const handleLogout = () => {
        keycloak.logout();
        handleClose();
    };

    const handleRegister = () => {
        keycloak.register();
        handleClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    return (
        <AppBar position="static">
        <Toolbar>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
            >
            Мое приложение
            </Typography>

            <Box>
                <IconButton
                    size="large"
                    onClick={handleMenu}
                    color="inherit"
                    aria-label="account"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {keycloak.authenticated ? (
                    [
                        <MenuItem key="profile" onClick={handleProfile}>
                        <AccountCircle sx={{ mr: 1 }} />
                        Профиль
                        </MenuItem>,
                        <MenuItem key="logout" onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        Выйти
                        </MenuItem>
                    ]
                    ) : (
                    [
                        <MenuItem key="login" onClick={handleLogin}>
                        <LoginIcon sx={{ mr: 1 }} />
                        Войти
                        </MenuItem>,
                        <MenuItem key="register" onClick={handleRegister}>
                        <RegisterIcon sx={{ mr: 1 }} />
                        Регистрация
                        </MenuItem>
                    ]
                    )}
                </Menu>
            </Box>
        </Toolbar>
        </AppBar>
    );
}

export default NavBar; 