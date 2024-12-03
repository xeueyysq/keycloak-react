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
  Settings as SettingsIcon,
  Flag as FlagIcon,
  AccountTree as AccountTreeIcon,
  Code as CodeIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import keycloak from '../keycloak';
import useMediaQuery from '@mui/material/useMediaQuery';

const DRAWER_WIDTH = 240;

function SideBar({ open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const menuItems = [
        { text: 'Главная', icon: <HomeIcon />, path: '/' },
        { text: 'Цели и задачи', icon: <FlagIcon />, path: '/goals' },
        { text: 'Pipeline', icon: <AccountTreeIcon />, path: '/pipeline' },
        { text: 'Стек технологий', icon: <CodeIcon />, path: '/tech-stack' },
        { text: 'Описание работы', icon: <DescriptionIcon />, path: '/description' },
        ...(keycloak.authenticated && !keycloak.hasRealmRole('secret-admin') ? [
            { text: 'Личный кабинет', icon: <PersonIcon />, path: '/profile' }
        ] : [])
    ];

    const handleUsersClick = () => {
        window.location.href = `http://localhost:8080/admin/sofa/console/#/sofa/users`;
    };

    const handleAccountManagement = () => {
        keycloak.accountManagement();
    };

    const adminMenuItems = [
        { text: 'Админка', icon: <SettingsIcon />, path: '/admin' },
        { text: 'Личный кабинет', icon: <PersonIcon />, path: '/profile' },
        { text: 'Статистика', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Пользователи', icon: <GroupIcon />, onClick: handleUsersClick },
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
            variant={isMobile ? "temporary" : "permanent"}
            open={open}
            onClose={onClose}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' ? '#1a1a1a' : '#1a2035',
                    color: 'white',
                    borderRight: 'none',
                    ...(isMobile ? {} : {
                        transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
                    }),
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
            <Box sx={{ 
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Box sx={{ 
                    p: 2,
                    backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' ? '#1a1a1a' : '#1a2035',
                }}>
                    <Typography
                        variant="h1"
                        component="div"
                        sx={{ 
                            color: 'white',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                            fontFamily: "'Host Grotesk', sans-serif",
                            letterSpacing: '0.05em',
                            fontSize: '1.5rem',
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
                        py: 1.5,
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
                            fontSize: '1.2rem'
                        }
                        }}>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                            fontSize: '1rem',
                            fontWeight: location.pathname === item.path ? 500 : 400
                        }} 
                        />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>

                {keycloak.hasRealmRole('secret-admin') && (
                <>
                    <Divider sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    my: 2
                    }} />
                    <List>
                    {adminMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={item.onClick || (() => navigate(item.path))}
                            selected={!item.onClick && location.pathname === item.path}
                            sx={{
                            py: 1.5,
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
                                fontSize: '1.2rem'
                            }
                            }}>
                            {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                            primary={item.text} 
                            primaryTypographyProps={{ 
                                fontSize: '1rem',
                                fontWeight: location.pathname === item.path ? 500 : 400
                            }} 
                            />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </>
                )}

                <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ 
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        my: 2
                    }} />
                    <List>
                        {!keycloak.authenticated ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton 
                                        onClick={handleLogin}
                                        sx={{
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            color: 'white', 
                                            minWidth: 56,
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '1.2rem'
                                            }
                                        }}>
                                            <LoginIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Войти" 
                                            primaryTypographyProps={{ 
                                                fontSize: '1rem'
                                            }} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton 
                                        onClick={handleRegister}
                                        sx={{
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            color: 'white', 
                                            minWidth: 56,
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '1.2rem'
                                            }
                                        }}>
                                            <RegisterIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Регистрация" 
                                            primaryTypographyProps={{ 
                                                fontSize: '1rem'
                                            }} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton 
                                    onClick={handleLogout}
                                    sx={{
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ 
                                        color: 'white', 
                                        minWidth: 56,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.2rem'
                                        }
                                    }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Выйти" 
                                        primaryTypographyProps={{ 
                                            fontSize: '1rem'
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