import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import keycloak from '../keycloak';
import { useSnackbar } from 'notistack';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.loadUserProfile()
        .then((profile) => {
          setProfile(profile);
          enqueueSnackbar('Профиль успешно загружен', { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar('Ошибка при загрузке профиля', { variant: 'error' });
        });
    }
  }, [enqueueSnackbar]);

  const handleDeleteAccount = () => {
    keycloak.accountManagement();
    enqueueSnackbar('Переход к управлению аккаунтом', { variant: 'info' });
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
    <Typography variant="h4">Учетные данные</Typography>
    {profile && (
        <>
        <Typography>Имя: {profile.firstName}</Typography>
        <Typography>Фамилия: {profile.lastName}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
            Удалить аккаунт
        </Button>
        </>
    )}
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
            Вы уверены, что хотите удалить аккаунт?
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog}>Отмена</Button>
        <Button onClick={handleDeleteAccount} color="secondary">
            Удалить
        </Button>
        </DialogActions>
    </Dialog>
    </Container>
);
}

export default UserProfile;
