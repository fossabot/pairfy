FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    ffmpeg \
    pkg-config \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

ENV NODE_ENV=production

CMD ["sh", "-c", "npm run database && npm start"]
