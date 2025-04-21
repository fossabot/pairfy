FROM node:20-slim

WORKDIR /app


COPY package*.json ./


COPY src/handlers/service-email/package.json ./src/handlers/service-email/

RUN npm install


COPY . .


RUN npm run build

EXPOSE 4000


CMD ["npm", "start"]
