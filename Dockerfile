# Fase base con Corepack per pnpm (Debian-based)
FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Fase delle dipendenze con cache separata
FROM base AS deps
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Fase di build ottimizzata
FROM base AS builder
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Fase finale di produzione
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    COREPACK_HOME=/app/.corepack

WORKDIR /app
# Copia i file necessari per l'installazione delle dipendenze

RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs nextjs && \
    mkdir -p /app/.corepack && \
    chown -R nextjs:nodejs /app && \
    chmod -R 755 /app && \
    corepack enable --install-directory=/app/.corepack

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]