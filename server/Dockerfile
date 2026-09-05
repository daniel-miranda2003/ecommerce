FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=development

EXPOSE 9000

CMD ["pnpm", "run", "dev"]
