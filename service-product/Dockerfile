FROM node:lts

WORKDIR /app

COPY package.json .

RUN ls

RUN npm install --verbose --no-package-lock

COPY . .

RUN npm run build

EXPOSE 8001

CMD ["sh", "-c", "npm run database && npm start"]

