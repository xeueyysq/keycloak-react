import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import ProfilePage from '../ProfilePage';

function Adminka() {
    const [showProfile, setShowProfile] = useState(false);
    const theme = useTheme();

    const handleButtonClick = () => {
        setShowProfile(!showProfile);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', p: 3 }}>
            <Box sx={{ flex: 1, pr: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Административная панель
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь вы можете управлять настройками приложения
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                    sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : undefined,
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#333' : undefined,
                        },
                        mt: 1,
                    }}
                >
                    {showProfile ? 'Скрыть ЛК' : 'Открыть ЛК'}
                </Button>
            </Box>
            {showProfile && (
                <Box sx={{ flex: 2, pl: 2 }}>
                    <ProfilePage />
                </Box>
            )}
        </Box>
    );
}

export default Adminka;
