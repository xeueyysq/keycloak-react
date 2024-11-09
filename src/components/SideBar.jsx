import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import keycloak from '../keycloak';

const DRAWER_WIDTH = 350;

function SideBar({ open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Главная', icon: <HomeIcon />, path: '/' },
        ...(keycloak.authenticated ? [
            { text: 'Личный кабинет', icon: <PersonIcon />, path: '/profile' }
        ] : [])
    ];

    const adminMenuItems = [
        { text: 'Дашборд', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Пользователи', icon: <GroupIcon />, path: '/admin/users' },
    ];

    const handleLogin = () => {
        keycloak.login();
    };

    const handleLogout = () => {
        keycloak.logout();
    };

    const handleRegister = () => {
        keycloak.register();
    };

    return (
        <Drawer
        variant="permanent"
        sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                backgroundColor: (theme) => 
                    theme.palette.mode === 'light' ? '#283046' : '#323232',
                color: 'white',
                borderRight: 'none',
                transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
                transition: 'transform 0.3s ease-in-out',
                height: '100%',
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer,
                boxShadow: '4px 0 8px rgba(0, 0, 0, 0.4)',
                '& .MuiTypography-root': {
                    color: 'white'
                }
            },
        }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <Box sx={{ 
                    p: 3,
                    backgroundColor: (theme) => 
                        theme.palette.mode === 'light' ? '#283046' : '#323232',
                }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ 
                            color: 'white',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                            fontFamily: "'Host Grotesk', sans-serif",
                            letterSpacing: '0.05em',
                        }}
                    >
                        Keycloak
                    </Typography>
                </Box>

                <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                    <ListItemButton
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                        py: 2,
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            },
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                        }}
                    >
                        <ListItemIcon sx={{ 
                        color: 'white', 
                        minWidth: 56,
                        '& .MuiSvgIcon-root': {
                            fontSize: '2rem'
                        }
                        }}>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                            fontSize: '1.4rem',
                            fontWeight: location.pathname === item.path ? 500 : 400
                        }} 
                        />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>

                {keycloak.hasRealmRole('admin') && (
                <>
                    <Divider sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    my: 2
                    }} />
                    <List>
                    {adminMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                            py: 2,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            },
                            }}
                        >
                            <ListItemIcon sx={{ 
                            color: 'white', 
                            minWidth: 56,
                            '& .MuiSvgIcon-root': {
                                fontSize: '2rem'
                            }
                            }}>
                            {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                            primary={item.text} 
                            primaryTypographyProps={{ 
                                fontSize: '1.4rem',
                                fontWeight: location.pathname === item.path ? 500 : 400
                            }} 
                            />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </>
                )}

                <Box sx={{ mt: 'auto', mb: 2 }}>
                    <Divider sx={{ 
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        my: 2
                    }} />
                    <List>
                        {!keycloak.authenticated ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogin} sx={{
                                        py: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}>
                                        <ListItemIcon sx={{ 
                                            color: 'white', 
                                            minWidth: 56,
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '2rem'
                                            }
                                        }}>
                                            <LoginIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Войти" 
                                            primaryTypographyProps={{ 
                                                fontSize: '1.4rem'
                                            }} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleRegister} sx={{
                                        py: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}>
                                        <ListItemIcon sx={{ 
                                            color: 'white', 
                                            minWidth: 56,
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '2rem'
                                            }
                                        }}>
                                            <RegisterIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Регистрация" 
                                            primaryTypographyProps={{ 
                                                fontSize: '1.4rem'
                                            }} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout} sx={{
                                    py: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}>
                                    <ListItemIcon sx={{ 
                                        color: 'white', 
                                        minWidth: 56,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '2rem'
                                        }
                                    }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Выйти" 
                                        primaryTypographyProps={{ 
                                            fontSize: '1.4rem'
                                        }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
}

export default SideBar; 