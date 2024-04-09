FROM node:19.4.0 AS base

FROM base AS deps
RUN apt-get update && apt-get install -y netcat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN yarn install --unsafe-perm

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . /app
RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app /app

USER node

EXPOSE 8898

HEALTHCHECK --interval=30s --timeout=3s CMD nc -z localhost 8898 || exit 1
CMD ["yarn", "start", "-p", "8898"]
