import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KC_URL,
    realm: 'sofa',
    clientId: 'keycloak-react',
    enableLogging: import.meta.env.DEV,
    checkLoginIframe: false,
});

keycloak.onTokenExpired = () => {
    keycloak.updateToken(30).catch(() => {
        keycloak.logout();
    });
};

export default keycloak;