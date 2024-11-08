import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBox, Dashboard, People } from '@mui/icons-material';
import { useKeycloak } from '@react-keycloak/web';

function SideBar({ open, onClose }) {
  const { keycloak } = useKeycloak();

  const isAdmin = keycloak.hasRealmRole('admin');

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
    <List>
        <ListItem button component="a" href="/profile">
        <ListItemIcon>
            <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Учетные данные" />
        </ListItem>
        {isAdmin && (
        <>
            <ListItem button component="a" href="/admin/dashboard">
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Дашборд" />
            </ListItem>
            <ListItem button component="a" href="/admin/users">
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
            </ListItem>
        </>
        )}
    </List>
    </Drawer>
);
}

export default SideBar;
