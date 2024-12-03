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
    Code as CodeIcon,
    Storage as StorageIcon,
    Security as SecurityIcon,
    Build as BuildIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

function TechStackPage() {
    const technologies = [
        {
            title: "Frontend",
            icon: <CodeIcon color="primary" />,
            items: [
                "React 18+",
                "Material UI 5",
                "React Router 6",
                "Vite",
                "Keycloak-js"
            ]
        },
        {
            title: "Безопасность",
            icon: <SecurityIcon color="primary" />,
            items: [
                "Keycloak 22",
                "OAuth 2.0",
                "OpenID Connect",
                "JWT токены",
                "RBAC"
            ]
        },
        {
            title: "Функционал",
            icon: <BuildIcon color="primary" />,
            items: [
                "Авторизация",
                "Личный кабинет",
                "Админ-панель",
                "Темная тема",
                "PWA"
            ]
        },
        {
            title: "Дополнительно",
            icon: <StorageIcon color="primary" />,
            items: [
                "ESLint",
                "Docker",
                "Nginx",
                "Git",
                "CI/CD"
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
                    <CodeIcon color="primary" sx={{ mr: 1, fontSize: '1.4rem' }} />
                    <Typography variant="h5" component="h1" color="primary" sx={{ fontSize: '1.4rem' }}>
                        Стек технологий
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {technologies.map((tech, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper 
                                elevation={2} 
                                sx={{ 
                                    p: 1.5,
                                    height: '100%',
                                    '& .MuiListItem-root': {
                                        py: 0.5
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
                                    {tech.icon}
                                    <Typography variant="subtitle1" sx={{ 
                                        ml: 1,
                                        fontSize: '1rem',
                                        fontWeight: 'medium'
                                    }}>
                                        {tech.title}
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
                                    {tech.items.map((item, itemIndex) => (
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

export default TechStackPage;