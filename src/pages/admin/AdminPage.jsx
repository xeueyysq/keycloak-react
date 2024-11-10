import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import keycloak from '../../keycloak';

function AdminPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleAccountManagement = () => {
        keycloak.accountManagement();
    };

    const handleAdminConsole = () => {
        window.location.href = `${keycloak.authServerUrl}/admin/${keycloak.realm}/console/`;
    };

    const hasSecretAdminRole = keycloak.hasRealmRole('secret-admin');

    return (
        <Box sx={{ 
            width: '100%',
            p: { xs: 1, sm: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1, sm: 2 }
        }}>
            <Typography 
                variant="h4" 
                gutterBottom
                sx={{
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    textAlign: { xs: 'center', sm: 'left' },
                    maxWidth: '100%'
                }}
            >
                Административная панель
            </Typography>
            <Typography variant="body1" gutterBottom>
                Привет, Админ! Здесь ты можешь перейти в консоль Keycloak и личный кабинет Keycloak.
            </Typography>
            <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
            }}>
                {hasSecretAdminRole && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleAdminConsole}
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: { xs: 0.5, sm: 1 },
                            px: { xs: 1.5, sm: 2 },
                            backgroundColor: undefined,
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? '#333' : undefined,
                            }
                        }}
                    >
                        Консоль
                    </Button>
                )}
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAccountManagement}
                    sx={{
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 1.5, sm: 2 },
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : undefined,
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#333' : undefined,
                        }
                    }}
                >
                    Личный кабинет Keycloak
                </Button>
            </Box>
        </Box>
    );
}

export default AdminPage;
