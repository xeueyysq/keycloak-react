import { useMediaQuery } from '@mui/material';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    useTheme,
    Tooltip,
} from '@mui/material';
import {
    Menu as MenuIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

function NavBar({ onMenuClick, sidebarOpen, toggleTheme, isDarkMode }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: (theme) => theme.palette.mode === 'light'
                    ? theme.palette.background.paper
                    : '#1a1a1a',
                color: theme.palette.text.primary,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 0}px)`,
                height: '50px',
                ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
                transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
                justifyContent: 'center'
            }}
        >
            <Toolbar sx={{ height: '100%', minHeight: '50px', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={{ 
                        mr: 2,
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.4rem',
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title={isDarkMode ? "Светлая тема" : "Темная тема"}>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: '1.5rem',
                            }
                        }}
                    >
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
