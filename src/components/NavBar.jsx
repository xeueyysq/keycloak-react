import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import useThemeStore from '../store/themeStore';
import keycloak from '../keycloak';
import SideBar from './SideBar';

function NavBar() {
    const darkMode = useThemeStore((state) => state.darkMode);
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

    const [anchorEl, setAnchorEl] = useState(null);
    const isLoggedIn = keycloak.authenticated;

    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
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
                            <MenuItem onClick={handleRegister}>Зарегаться</MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
            <SideBar open={drawerOpen} onClose={handleDrawerClose} />
        </AppBar>
    );
}

export default NavBar;
