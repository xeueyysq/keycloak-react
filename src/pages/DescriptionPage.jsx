import { 
    Container, 
    Typography, 
    Paper,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Description as DescriptionIcon,
    CheckCircle as CheckIcon,
    Code as CodeIcon,
    Build as BuildIcon
} from '@mui/icons-material';

function DescriptionPage() {
    const stages = [
        "Настройка Keycloak сервера и создание Realm",
        "Создание клиента и настройка параметров безопасности",
        "Конфигурация ролей и групп пользователей",
        "Интеграция Keycloak с React приложением",
        "Реализация защищенных маршрутов и RBAC",
        "Разработка системы аутентификации и авторизации",
        "Создание личного кабинета пользователя",
        "Разработка административной панели",
        "Интеграция с Keycloak REST API",
        "Внедрение PWA функциональности"
    ];

    const features = [
        "Single Sign-On через Keycloak",
        "Защита маршрутов на основе ролей",
        "Управление сессиями пользователей",
        "Интеграция с Keycloak Account Console",
        "Административный интерфейс",
        "Управление пользователями через API",
        "Поддержка офлайн режима",
        "Установка как PWA приложение"
    ];

    return (
        <Container maxWidth={false} sx={{ 
            py: 1,
            pr: '20px'
        }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2
                }}>
                    <BuildIcon color="primary" sx={{ mr: 1, fontSize: '1.4rem' }} />
                    <Typography variant="h5" component="h1" color="primary" sx={{ fontSize: '1.4rem' }}>
                        Этапы разработки
                    </Typography>
                </Box>
                <List dense>
                    {stages.map((stage, index) => (
                        <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckIcon color="success" sx={{ fontSize: '0.9rem' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={stage} 
                                sx={{ 
                                    '& .MuiTypography-root': { 
                                        fontSize: '0.9rem' 
                                    } 
                                }} 
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            
        </Container>
    );
}

export default DescriptionPage; 