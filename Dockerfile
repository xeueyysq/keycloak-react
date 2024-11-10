FROM node:16-alpine AS build
WORKDIR /app

ARG VITE_KC_URL
ARG VITE_APP_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN echo "VITE_KC_URL=${VITE_KC_URL}" > .env
RUN echo "VITE_APP_URL=${VITE_APP_URL}" >> .env

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
