FROM node:20.10.0

WORKDIR /usr/src/app

ENV NODE_ENV="development"

COPY ./package.json ./

RUN npm install

# ./ dir เครื่อง  ./ dir docker /usr/src/app/index.js
COPY ./index.js ./

EXPOSE 8000

CMD ["node", "index.js"]