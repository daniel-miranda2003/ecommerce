# Next.js 15.2.0 - Client Storefront - Modo Desarrollo
# Docker local. El código fuente se monta por bind mount (./client:/app)
# y node_modules se sirve desde un volumen anónimo inicializado con la
# instalación reproducida en la imagen (pnpm-lock.yaml fijado).
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

EXPOSE 8000

CMD ["pnpm", "run", "dev"]
