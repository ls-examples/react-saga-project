FROM node:9-onbuild as build-env

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build

FROM node:9-alpine

COPY --from=build-env /usr/src/app/node_modules/ ./node_modules
COPY --from=build-env /usr/src/app/build/ ./build
COPY . .

EXPOSE 3000

CMD yarn start
