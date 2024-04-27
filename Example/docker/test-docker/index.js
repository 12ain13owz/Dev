const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 8000;

let conn = null;

const initMySql = async () => {
  conn = await mysql.createConnection({
    host: "db_mysql",
    user: "root",
    password: "root",
    database: "tutorial",
  });
};

app.get("/hello-world", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const [result] = await conn.query("SELECT * FROM users");
  res.json(result);
});

app.listen(port, async () => {
  await initMySql();
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(process.env.NODE_ENV);
});
