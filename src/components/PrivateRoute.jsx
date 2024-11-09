import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function PrivateRoute({ children, roles }) {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    const hasRequiredRole = roles ? roles.some((role) => keycloak.hasRealmRole(role)) : true;

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (!hasRequiredRole) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
