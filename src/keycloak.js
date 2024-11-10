import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'sofa',
    clientId: 'keycloak-react',
    enableLogging: true,
    checkLoginIframe: false,
});

keycloak.onTokenExpired = () => {
    console.log('Token expired');
    keycloak.updateToken(30).catch(() => {
        console.log('Failed to refresh token');
        keycloak.logout();
    });
};

export default keycloak;