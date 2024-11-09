import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import ProfilePage from '../ProfilePage';

function AdminPage() {
    const [showProfile, setShowProfile] = useState(false);
    const theme = useTheme();

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

            <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, sm: 3 },
                width: '100%'
            }}>
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1, sm: 2 },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    flex: 1
                }}>
                    <Typography 
                        variant="body1" 
                        gutterBottom
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            textAlign: { xs: 'center', sm: 'left' },
                            maxWidth: '100%'
                        }}
                    >
                        Здесь вы можете управлять настройками приложения
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowProfile(!showProfile)}
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
                        {showProfile ? 'Скрыть ЛК' : 'Открыть ЛК'}
                    </Button>
                </Box>

                {showProfile && (
                    <Box sx={{ 
                        flex: { xs: 1, md: 2 },
                        mt: { xs: 2, sm: 2 }
                    }}>
                        <ProfilePage />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default AdminPage;
