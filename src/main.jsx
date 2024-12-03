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

keycloak.init({
  onLoad: 'check-sso',
  checkLoginIframe: false,
  enableLogging: import.meta.env.DEV,
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
}).then((authenticated) => {
  console.log('Keycloak initialized, authenticated:', authenticated);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Keycloak initialization error:', error);
});