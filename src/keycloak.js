import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'sofa-1',
  clientId: 'keycloak-react',
});

export default keycloak;