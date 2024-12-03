# Демонстрационное приложение React с Keycloak

Приложение доступно по https://130.193.57.13:5173/

Это демонстрационное приложение, показывающее интеграцию React и Keycloak для аутентификации и авторизации.

## Особенности приложения

- 🔐 Аутентификация и авторизация через Keycloak
- 🎨 Темная/светлая тема
- 📱 Адаптивный дизайн
- 🚀 PWA (Progressive Web Application)
- 🔄 Автоматическое обновление токенов
- 👥 Управление пользователями
- 🎭 Ролевой доступ

## Требования

Для запуска приложения необходимо:

- Docker и Docker Compose
- Node.js версии 16 или выше
- npm (устанавливается вместе с Node.js)

## Установка и запуск

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/xeueyysq/keycloak-react.git
   cd keycloak-react
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл .env в корне проекта (если он отсутствует):
   ```bash
    VITE_KC_URL=http://localhost:8080
    VITE_APP_URL=http://localhost:5173
    KC_COMMAND=start-dev
    KC_PROXY=edge
    KC_HOSTNAME_STRICT=false
    KC_HOSTNAME_STRICT_HTTPS=false
   ```

4. Запустите Docker контейнеры:
   ```bash
   docker-compose up -d --build
   ```
   
6. После запуска доступны:
   - Фронтенд приложение: http://localhost:5173
   - Административная консоль Keycloak: http://localhost:8080
     - Логин: admin
     - Пароль: admin

## Функциональность

### Аутентификация
- Регистрация новых пользователей
- Вход через Keycloak
- Восстановление пароля
- Верификация email

### Роли пользователей
- `secret-admin`: Полный доступ к админ-панели
- `user`: Авторизованный пользователь

### Административные функции
- Управление пользователями
- Просмотр статистики
- Доступ к консоли Keycloak

## Стилизация

### Темы
- Поддержка светлой и темной темы
- Адаптивный дизайн для мобильных устройств

### Material-UI
- Кастомизированные компоненты
- Responsive дизайн

## PWA

### Возможности
- Оффлайн работа
- Установка на устройство
- Кэширование статических ресурсов

### Настройка
PWA конфигурация находится в vite.config.js:
- Автоматическое обновление
- Кэширование шрифтов
- Настраиваемые иконки

## Безопасность

### Keycloak
- SSL/TLS шифрование
- Токен-based аутентификация
- Автоматическое обновление токенов
- Защита от CSRF

### Приложение
- Защищенные маршруты
- Валидация ролей
- Безопасные HTTP-заголовки
- Санитизация данных
