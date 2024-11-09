import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloak from './keycloak';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

keycloak.init({ onLoad: 'check-sso' }).then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Keycloak initialization error:', error);
});