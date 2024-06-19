FROM node:18.20.3

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Build && Run
# docker build -t node-mongo-crud .
# docker run -d -p 3000:3000 --name node-mongo-crud node-mongo-crud