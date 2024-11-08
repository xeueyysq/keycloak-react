import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useThemeStore from '../store/themeStore';
import keycloak from '../keycloak';

function NavBar() {
    const darkMode = useThemeStore((state) => state.darkMode);
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

    const [anchorEl, setAnchorEl] = useState(null);
    const isLoggedIn = keycloak.authenticated;

    const handleLogin = () => {
        keycloak.login();
    };

    const handleLogout = () => {
        keycloak.logout();
    };

    const handleRegister = () => {
        keycloak.register();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenu}
            >
            <AccountCircle />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            ) : (
                <>
                <MenuItem onClick={handleLogin}>Войти</MenuItem>
                <MenuItem onClick={handleRegister}>Зарегистрироваться</MenuItem>
                </>
            )}
            </Menu>
        </Toolbar>
        </AppBar>
    );
}

export default NavBar;
