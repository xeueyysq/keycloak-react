FROM node:16-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV VITE_KC_URL=http://localhost:8080
ENV VITE_APP_URL=http://localhost:5173


EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
