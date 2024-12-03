import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KC_URL,
    realm: 'sofa',
    clientId: 'keycloak-react',
    checkLoginIframe: false
});

keycloak.onTokenExpired = () => {
    keycloak.updateToken(30).catch(() => {
        keycloak.logout();
    });
};

console.log('VITE_KC_URL:', import.meta.env.VITE_KC_URL);
console.log('VITE_APP_URL:', import.meta.env.VITE_APP_URL);

export default keycloak;