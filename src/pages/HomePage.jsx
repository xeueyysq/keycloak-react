import { Typography, Box, useTheme } from '@mui/material';

function HomePage() {
    const theme = useTheme();

    return (
        <Box sx={{
            width: '100%',
            p: { xs: 1, sm: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'flex-start' }
        }}>
            <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                    textAlign: { xs: 'center', sm: 'left' },
                    maxWidth: '100%'
                }}
            >
                Добро пожаловать на {theme.palette.mode === 'light' ? 'светлую' : 'темную'} тему
            </Typography>
        </Box>
    );
}

export default HomePage;
