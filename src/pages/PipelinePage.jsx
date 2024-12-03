import { 
    Container, 
    Typography, 
    Paper, 
    Box,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Login as LoginIcon,
    Security as SecurityIcon,
    Person as PersonIcon,
    AdminPanelSettings as AdminIcon,
    Settings as SettingsIcon,
    AccountTree as PipelineIcon,
    ArrowForward as ArrowIcon
} from '@mui/icons-material';

function PipelinePage() {
    const pipeline = [
        {
            title: "Установка окружения",
            icon: <LoginIcon color="primary" />,
            items: [
                "Установка зависимостей",
                "Настройка переменных окружения",
            ]
        },
        {
            title: "Сборка и запуск",
            icon: <SecurityIcon color="primary" />,
            items: [
                "Dockerfile для клиента",
                "Docker Compose для запуска контейнеров",
            ]
        },
        {
            title: "Аутентификация и авторизация",
            icon: <PersonIcon color="primary" />,
            items: [
                "Интеграция с Keycloak",
                "Управления пользователями и ролями",
            ]
        },
        {
            title: "Фронтенд",
            icon: <AdminIcon color="primary" />,
            items: [
                "Использование React",
                "Настройка маршрутизации",
            ]
        },
        {
            title: "PWA",
            icon: <SettingsIcon color="primary" />,
            items: [
                "Настройка PWA",
                "vite-plugin-pwa",
                "Манифест"
            ]
        }
    ];

    return (
        <Container maxWidth={false} sx={{ 
            py: 1,
            pr: '20px'
        }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2
                }}>
                    <PipelineIcon color="primary" sx={{ mr: 1, fontSize: '1.4rem' }} />
                    <Typography variant="h5" component="h1" color="primary" sx={{ fontSize: '1.4rem' }}>
                        Pipeline приложения
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {pipeline.map((section, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper 
                                elevation={2} 
                                sx={{ 
                                    p: 1.5,
                                    height: '100%',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        display: index === pipeline.length - 1 ? 'none' : 'block',
                                        position: 'absolute',
                                        top: '50%',
                                        right: '-10px',
                                        width: '20px',
                                        height: '20px',
                                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231976d2'%3E%3Cpath d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'/%3E%3C/svg%3E") center/contain no-repeat`,
                                        zIndex: 1
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 1,
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '1.2rem'
                                    }
                                }}>
                                    {section.icon}
                                    <Typography variant="subtitle1" sx={{ 
                                        ml: 1,
                                        fontSize: '1rem',
                                        fontWeight: 'medium'
                                    }}>
                                        {section.title}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 1 }} />
                                <List dense sx={{
                                    '& .MuiListItem-root': {
                                        py: 0.5
                                    },
                                    '& .MuiListItemIcon-root': {
                                        minWidth: 28,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '0.9rem'
                                        }
                                    },
                                    '& .MuiListItemText-root': {
                                        margin: 0,
                                        '& .MuiTypography-root': {
                                            fontSize: '0.9rem'
                                        }
                                    }
                                }}>
                                    {section.items.map((item, itemIndex) => (
                                        <ListItem key={itemIndex}>
                                            <ListItemIcon>
                                                <ArrowIcon color="action" />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}

export default PipelinePage;