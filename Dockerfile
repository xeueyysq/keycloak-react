FROM node:16-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV VITE_KC_URL=${VITE_KC_URL}
ENV VITE_APP_URL=${VITE_APP_URL}

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]
