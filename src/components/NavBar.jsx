import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useThemeStore from '../store/themeStore';

function NavBar() {
    const darkMode = useThemeStore((state) => state.darkMode);
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Toolbar>
        </AppBar>
    );
}

export default NavBar;
