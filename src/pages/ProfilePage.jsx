import { useEffect, useState, cloneElement } from 'react';
import keycloak from '../keycloak';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Chip,
  CircularProgress
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
                sx={{
                width: 100,
                height: 100,
                bgcolor: (theme) => theme.palette.mode === 'light' ? 'primary.main' : '#fff',
                color: (theme) => theme.palette.mode === 'light' ? '#fff' : '#323232',
                mb: 2,
                fontSize: '2.5rem'
                }}
            >
                {userInfo.firstName?.[0]}{userInfo.lastName?.[0]}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
                color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff'
            }}>
                Личный кабинет
            </Typography>
            </Box>

            <List>
            {profileItems.map((item, index) => (
                <Box key={index}>
                <ListItem>
                    <Box sx={{ mr: 2, color: (theme) => 
                        theme.palette.mode === 'light' ? 'primary.main' : '#fff' }}>
                    {cloneElement(item.icon, { sx: { fontSize: '2rem' } })}
                    </Box>
                    <ListItemText
                    primary={
                        <Typography variant="body1" sx={{ 
                        fontWeight: 500, 
                        fontSize: '1.4rem',
                        color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff'
                        }}>
                        {item.primary}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body1" sx={{ 
                        color: (theme) => theme.palette.mode === 'light' ? '#666666' : '#ccc',
                        fontSize: '1.3rem'
                        }}>
                        {item.secondary || 'Не указано'}
                        </Typography>
                    }
                    />
                </ListItem>
                {index < profileItems.length - 1 && <Divider />}
                </Box>
            ))}
            
            <ListItem>
                <Box sx={{ mr: 2, color: (theme) => 
                    theme.palette.mode === 'light' ? 'primary.main' : '#fff' }}>
                <VpnKey sx={{ fontSize: '2rem' }} />
                </Box>
                <ListItemText
                primary={
                    <Typography variant="body1" sx={{ 
                    fontWeight: 500, 
                    fontSize: '1.4rem',
                    color: (theme) => theme.palette.mode === 'light' ? '#283046' : '#fff'
                    }}>
                    Роли
                    </Typography>
                }
                secondary={
                    <Box sx={{ mt: 1 }}>
                    {keycloak.realmAccess?.roles.map((role) => (
                        <Chip
                        key={role}
                        label={role}
                        color={role === 'admin' ? 'error' : 'primary'}
                        size="medium"
                        sx={{ 
                            mr: 1, 
                            mb: 1,
                            fontSize: '1.2rem',
                            height: '36px'
                        }}
                        />
                    ))}
                    </Box>
                }
                />
            </ListItem>
            </List>
        </Paper>
        </Container>
    );
}

export default ProfilePage; 