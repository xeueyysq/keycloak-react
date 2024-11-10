import { useEffect, useState, cloneElement } from 'react';
import keycloak from '../keycloak';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Person,
  Email,
  Badge,
  AccountBox,
  VpnKey
} from '@mui/icons-material';

function ProfilePage() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        keycloak.loadUserProfile()
        .then(profile => {
            setUserInfo(profile);
        })
        .catch(error => {
            console.error('Failed to load user profile:', error);
        });
    }, []);

    if (!userInfo) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flex: 1
            }}>
                <CircularProgress />
            </Box>
        );
    }

    const profileItems = [
        { icon: <Badge />, primary: 'ID', secondary: userInfo.id },
        { icon: <AccountBox />, primary: 'Username', secondary: userInfo.username },
        { icon: <Email />, primary: 'Email', secondary: userInfo.email },
        { icon: <Person />, primary: 'Имя', secondary: userInfo.firstName },
        { icon: <Person />, primary: 'Фамилия', secondary: userInfo.lastName },
    ];

    const handleAccountManagement = () => {
        keycloak.accountManagement();
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flex: 1,
            pt: { xs: 1, sm: 2 },
            mt: -2,
            px: { xs: 1, sm: 2 },
        }}>
            <Paper elevation={3} sx={{ 
                p: { xs: 1.5, sm: 2.5 },
                backgroundColor: (theme) => theme.palette.mode === 'light' 
                    ? 'background.paper' 
                    : '#1a1a1a',
                width: '100%',
                maxWidth: { xs: '100%', sm: '500px' },
            }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            bgcolor: (theme) => theme.palette.mode === 'light' ? 'primary.main' : '#fff',
                            color: (theme) => theme.palette.mode === 'light' ? '#fff' : '#323232',
                            mb: 1.5,
                            fontSize: '1.2rem'
                        }}
                    >
                        {userInfo.firstName?.[0]}{userInfo.lastName?.[0]}
                    </Avatar>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ 
                        color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff',
                        fontSize: '1.2rem',
                        mb: 1
                    }}>
                        Личный кабинет
                    </Typography>
                </Box>

                <List sx={{ 
                    pt: 0,
                    '& .MuiListItem-root': {
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 2 }
                    }
                }}>
                    {profileItems.map((item, index) => (
                        <Box key={index}>
                            <ListItem sx={{ py: 1 }}>
                                <Box sx={{ mr: 2, color: (theme) => 
                                    theme.palette.mode === 'light' ? 'primary.main' : '#fff' }}>
                                    {cloneElement(item.icon, { sx: { fontSize: '1.2rem' } })}
                                </Box>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ 
                                            fontWeight: 500, 
                                            fontSize: '0.9rem',
                                            color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff'
                                        }}>
                                            {item.primary}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" sx={{ 
                                            color: (theme) => theme.palette.mode === 'light' ? '#666666' : '#ccc',
                                            fontSize: '0.8rem'
                                        }}>
                                            {item.secondary || 'Не указано'}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < profileItems.length - 1 && <Divider />}
                        </Box>
                    ))}
                    
                    <ListItem sx={{ py: 1 }}>
                        <Box sx={{ mr: 2, color: (theme) => 
                            theme.palette.mode === 'light' ? 'primary.main' : '#fff' }}>
                            <VpnKey sx={{ fontSize: '1.2rem' }} />
                        </Box>
                        <ListItemText
                            primary={
                                <Typography variant="body1" sx={{ 
                                    fontWeight: 500, 
                                    fontSize: '0.9rem',
                                    color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff'
                                }}>
                                    Роли
                                </Typography>
                            }
                            secondary={
                                <Box sx={{ mt: 0.5 }}>
                                    {keycloak.realmAccess?.roles.map((role) => (
                                        <Chip
                                            key={role}
                                            label={role}
                                            color={role === 'secret-admin' ? 'error' : 'primary'}
                                            size="small"
                                            sx={{ 
                                                mr: 0.5, 
                                                mb: 0.5,
                                                fontSize: '0.7rem',
                                                height: '20px'
                                            }}
                                        />
                                    ))}
                                </Box>
                            }
                        />
                    </ListItem>

                    {!keycloak.hasRealmRole('secret-admin') && (
                        <ListItem sx={{ py: 1 }}>
                            <Typography
                                component="a"
                                onClick={handleAccountManagement}
                                sx={{
                                    color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : '#4fc3f7',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Перейти в личный кабинет Keycloak
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </Paper>
        </Box>
    );
}

export default ProfilePage; 