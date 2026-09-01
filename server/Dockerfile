# Medusa.js v2 - Server (Motor E-commerce) - Modo Desarrollo
# Docker local. El código fuente se monta por bind mount (./server:/app)
# y node_modules se sirve desde un volumen anónimo inicializado con la
# instalación reproducida en la imagen (pnpm-lock.yaml fijado).
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=development

EXPOSE 9000

CMD ["pnpm", "run", "dev"]
