# Stage 1: Build the Nuxt 3 app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the source code
COPY . .

# Build the Nuxt SSR app
RUN npm run build

# Stage 2: Serve the Nuxt app
FROM node:20-alpine AS runner

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup -g 1001 -S nuxt && adduser -S nuxt -u 1001

# Set working directory
WORKDIR /app

# Copy .output folder from builder
COPY --from=builder /app/.output ./.output

# Optional: copy any public assets if needed (for static serving)
# COPY --from=builder /app/public ./public

# Set correct permissions
RUN chown -R nuxt:nuxt /app
USER nuxt

# Expose port used by Nuxt server
EXPOSE 3000

# Run Nuxt SSR server
CMD ["node", ".output/server/index.mjs"]
