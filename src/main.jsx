import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloak from './keycloak';
import { registerSW } from 'virtual:pwa-register';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Доступно обновление. Обновить?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('Приложение готово к работе офлайн');
  },
});

keycloak.init({ onLoad: 'check-sso' }).then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Keycloak initialization error:', error);
});