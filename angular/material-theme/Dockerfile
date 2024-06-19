FROM node:20.14.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@18.0.4

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

# Build && Run
# docker build -t angular-theme .
# docker run -d -p 4200:4200 --name angular-theme angular-theme