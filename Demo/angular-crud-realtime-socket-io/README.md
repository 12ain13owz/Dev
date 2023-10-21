# Real-Time CRUD App with Angular, NodeJS, Socket.IO

# Environment

| Name      | Version |
| --------- | ------- |
| Angular   | 16.2.0  |
| Node JS   | 18.15.0 |
| Socket.IO | 4.7.2   |

# Getting started

## Angular

- Install dependencies

cd <project_name>

```
npm install
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)
Navigate to default `http://localhost:4200/`

## NodeJS

- cd <project_name>/server
- create file sample config/index.js

```
module.exports = {
  port: 3000,
  origin: "http://localhost:4200",
  database: process.env.DB_NAME || "crud_realtime",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin",
  option: {
    dialect: process.env.DIALECT || "sqlite",
    storage: "./database/crud_realtime.sqlite",
  },
};
```

- Install dependencies

cd <project_name>/server

```
npm install
```

- Build and run the project

```
npm start
```

Navigate to default `http://localhost:3000/`
