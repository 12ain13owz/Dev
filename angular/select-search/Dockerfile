FROM node:20.14.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@13.3.5

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

# Build && Run
# docker build -t angular-select .
# docker run -d -p 4200:4200 --name angular-select angular-select