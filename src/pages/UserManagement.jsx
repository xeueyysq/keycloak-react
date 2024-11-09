import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import keycloak from '../keycloak';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = keycloak.token;

    fetch('http://localhost:8080/admin/realms/myrealm/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Ошибка:', error));
  };

  const handleDeleteUser = (userId) => {
    const token = keycloak.token;

    fetch(`http://localhost:8080/admin/realms/myrealm/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchUsers())
      .catch((error) => console.error('Ошибка:', error));
  };

  return (
    <Container>
    <Typography variant="h4">Управление пользователями</Typography>
    <Table>
        <TableHead>
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Действия</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user) => (
            <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>
                <Button color="secondary" onClick={() => handleDeleteUser(user.id)}>
                Удалить
                </Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </Container>
);
}

export default UserManagement;
