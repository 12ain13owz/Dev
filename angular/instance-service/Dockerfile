FROM node:20.14.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@17.0.7

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

# Build && Run
# docker build -t angular-service .
# docker run -d -p 4200:4200 --name angular-service angular-service