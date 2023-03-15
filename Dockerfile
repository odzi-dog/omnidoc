# Builder
FROM node:18-buster as builder
WORKDIR /src

COPY . .
RUN npm install
RUN npm run build

# Deps
FROM node:18-buster as deps
WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install

# Runtime
FROM node:18-alpine as runtime
WORKDIR /src

COPY --from=builder /src/build .
COPY --from=deps ./src/node_modules ./node_modules
COPY package.json .

ENTRYPOINT [ "node", "index.js" ]