FROM node:lts as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
COPY .env .env

RUN yarn build

FROM node:lts-slim

ENV NODE_ENV production

USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY .env .env

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]