FROM node:20.14.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# Build && Run
# docker build -t node-handler-error .
# docker run -d -p 3000:3000 --name node-handler-error node-handler-error