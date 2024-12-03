import { 
    Container, 
    Typography, 
    Paper, 
    Grid, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
    Box,
    Divider 
} from '@mui/material';
import {
    Security as SecurityIcon,
    Person as PersonIcon,
    AdminPanelSettings as AdminIcon,
    Devices as DevicesIcon,
    Check as CheckIcon
} from '@mui/icons-material';

function GoalsPage() {
    const sections = [
        {
            title: "Аутентификация",
            icon: <SecurityIcon color="primary" />,
            items: [
                "Keycloak авторизация",
                "Регистрация и вход",
                "Роли доступа"
            ]
        },
        {
            title: "Пользователи",
            icon: <PersonIcon color="primary" />,
            items: [
                "Личный кабинет",
                "Роли и права",
                "Email верификация",
                "Keycloak интеграция"
            ]
        },
        {
            title: "Админ-панель",
            icon: <AdminIcon color="primary" />,
            items: [
                "Управление",
                "Статистика",
                "Пользователи",
                "Keycloak консоль"
            ]
        },
        {
            title: "Интерфейс",
            icon: <DevicesIcon color="primary" />,
            items: [
                "Адаптивный дизайн",
                "Тёмная тема",
                "Навигация",
                "PWA поддержка"
            ]
        }
    ];

    return (
        <Container maxWidth={false} sx={{ 
            py: 1,
            pr: '20px'
        }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" component="h1" gutterBottom color="primary" sx={{ fontSize: '1.4rem' }}>
                    Цели и задачи
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ 
                        fontWeight: 'medium',
                        fontSize: '1.1rem'
                    }}>
                        React-приложение с Keycloak для управления пользователями и настройками
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper elevation={2} sx={{ 
                                p: 1.5,
                                height: '100%',
                                '& .MuiListItem-root': {
                                    py: 0.5
                                }
                            }}>
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
                                                <CheckIcon color="success" />
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

export default GoalsPage; 