import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBox, Dashboard, People } from '@mui/icons-material';
import { useKeycloak } from '@react-keycloak/web';
import { useSnackbar } from 'notistack';

function SideBar({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const { keycloak } = useKeycloak();

  const isAdmin = keycloak.hasRealmRole('admin');

  const handleNavigation = (path, text) => {
    enqueueSnackbar(`Переход к ${text}`, { variant: 'info' });
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem 
          button 
          component="a" 
          href="/profile" 
          onClick={() => handleNavigation('/profile', 'учетным данным')}
        >
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Учетные данные" />
        </ListItem>
        {isAdmin && [
          <ListItem 
            key="dashboard"
            button 
            component="a" 
            href="/admin/dashboard"
            onClick={() => handleNavigation('/admin/dashboard', 'дашборду')}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Дашборд" />
          </ListItem>,
          <ListItem 
            key="users"
            button 
            component="a" 
            href="/admin/users"
            onClick={() => handleNavigation('/admin/users', 'управлению пользователями')}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>
        ]}
      </List>
    </Drawer>
  );
}

export default SideBar;
