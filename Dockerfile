FROM node:22-alpine AS base

# Abilita corepack per usare pnpm
RUN corepack enable

# Fase delle dipendenze
FROM base AS deps
RUN apk add --no-cache libc6-compat build-base
WORKDIR /app

# Copia i file specifici di pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Fase di build
FROM base AS builder
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Comandi di build con pnpm
RUN pnpm run build

# Fase di produzione
FROM base AS runner
RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "server.js"]