FROM node:lts

WORKDIR /app

COPY package.json .

RUN ls

RUN npm install --verbose

RUN rm -f package-lock.json

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["sh", "-c", "npm run database && npm start"]