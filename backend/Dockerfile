FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build-doc

EXPOSE 5000

CMD ["yarn","start"]