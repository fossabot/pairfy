FROM node:20-slim

WORKDIR /app

COPY package.json .

RUN ls

RUN npm config set registry http://host.docker.internal:4873/

RUN npm install --verbose --no-package-lock

COPY . .

RUN npm run build

EXPOSE 8001

CMD ["sh", "-c", "npm run database && npm start"]

