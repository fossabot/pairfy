# Etapa 1: Build
FROM node:20-slim AS builder

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


FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    ffmpeg \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package.json ./

RUN npm install --omit=dev --legacy-peer-deps

ENV NODE_ENV=production

CMD ["node", "dist/workers/processor.js"]
