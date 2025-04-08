# Stage 1: Build the Nuxt 3 app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the Nuxt app
FROM node:20-alpine AS runner

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup -g 1001 -S nuxt && adduser -S nuxt -u 1001

WORKDIR /app

COPY --from=builder /app/.output .

# Set correct permissions
RUN chown -R nuxt:nuxt /app
USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]