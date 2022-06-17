FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build-doc

# ENV PORT=4040

EXPOSE 4040

CMD ["yarn","start"]