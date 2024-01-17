FROM node:20.9.0-alpine3.18 AS build

WORKDIR /build

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i --frozen-lockfile

COPY prisma ./prisma

COPY src ./src

COPY tsconfig* nest-cli.json ./

RUN pnpx prisma generate

RUN pnpm run build

RUN pnpm prune --prod

FROM node:20.9.0-alpine3.18 as production

WORKDIR /app

RUN apk update && \
    apk upgrade libcrypto3 && \
    apk upgrade libssl3 && \
    rm -rf /var/cache/apk/*

COPY --from=build --chown=node:node /build/node_modules ./node_modules
COPY --from=build --chown=node:node /build/dist ./dist

USER node

CMD ["node", "dist/main.js"]
