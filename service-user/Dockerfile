FROM node:lts

WORKDIR /app

COPY package.json .

RUN ls

RUN npm install --verbose

COPY . .

RUN npm run build

EXPOSE 8000

RUN npm run database

CMD ["sh", "-c", "npm start"]