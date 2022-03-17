FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig* ./
COPY ./src .

ENV NODE_ENV=production

RUN yarn install
RUN yarn run build

FROM node:16-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 8080
CMD [ "node", "dist/app.js" ]