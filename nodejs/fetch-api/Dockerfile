FROM node:20.14.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

# Build && Run
# docker build -t node-fetch .
# docker run -d -p 3000:3000 --name node-fetch node-fetch