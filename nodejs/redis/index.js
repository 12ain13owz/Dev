const express = require("express");
const mysql = require("mysql2/promise");
const redis = require("redis");
const cron = require("node-cron");

const app = express();
const port = 3000;

app.use(express.json());

let conn = null;
let redisConn = null;

const initMySql = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorial",
  });
};

const initRedis = async () => {
  redisConn = redis.createClient();
  redisConn.on("error", (err) => console.log("Redis Client Error", err));
  await redisConn.connect();
};

app.get("/users", async (req, res) => {
  const cachedData = await redisConn.get("users");

  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const [result] = await conn.query("SELECT * FROM users");
  const userStringData = JSON.stringify(result);
  await redisConn.set("users", userStringData);

  res.json(result);
});

app.get("/users/cached-2", async (req, res) => {
  const cachedData = await redisConn.get("users-2");

  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const [result] = await conn.query("SELECT * FROM users");
  res.json(result);
});

app.post("/users", async (req, res) => {
  let user = req.body;
  const [result] = await conn.query("INSERT INTO users SET?", user);
  const cachedData = await redisConn.get("users-2");
  user.id = result.insertId;

  if (cachedData) {
    let usersData = JSON.parse(cachedData);
    usersData.push(user);
    await redisConn.set("users-2", JSON.stringify(usersData));
  } else {
    const [result] = await conn.query("SELECT * FROM users");
    await redisConn.set("users-2", JSON.stringify(result));
  }

  res.json({ message: "insert ok", result });
});

app.get("/users/cached-3", async (req, res) => {
  const cachedData = await redisConn.get("users-3");

  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const [result] = await conn.query("SELECT * FROM users");
  res.json(result);
});

app.put("/users/:id", async (req, res) => {
  let id = +req.params.id;
  let user = req.body;
  user.id = id;

  const cachedData = await redisConn.get("users-3");
  const userUpdateIndexString = await redisConn.get("user-update-index");
  let userUpdateIndex = [];

  if (userUpdateIndexString)
    userUpdateIndex = JSON.parse(userUpdateIndexString);

  if (cachedData) {
    const results = JSON.parse(cachedData);
    const selectedIndex = results.findIndex((user) => user.id === id);

    console.log(userUpdateIndex);
    userUpdateIndex.push(selectedIndex);
    results[selectedIndex] = user;
    await redisConn.set("users-3", JSON.stringify(results));
  } else {
    const [results] = await conn.query("SELECT * FROM users");
    const selectedIndex = results.findIndex((user) => user.id === id);

    userUpdateIndex.push(selectedIndex);
    results[selectedIndex] = user;
    await redisConn.set("users-3", JSON.stringify(results));
  }

  await redisConn.set("user-update-index", JSON.stringify(userUpdateIndex));
  res.json({ message: "update ok", user });
});

cron.schedule("*/5 * * * * * ", async () => {
  const cachedDataString = await redisConn.get("users-3");
  const userUpdateIndexString =
    (await redisConn.get("user-update-index")) || [];

  const cachedData = JSON.parse(cachedDataString);
  const userUpdateIndex = JSON.parse(userUpdateIndexString);

  if (userUpdateIndex.length > 0) {
    for (let i = 0; i < userUpdateIndex.length; i++) {
      const id = cachedData[userUpdateIndex[i]].id;
      const updateUser = {
        name: cachedData[userUpdateIndex[i]].name,
        age: cachedData[userUpdateIndex[i]].age,
        description: cachedData[userUpdateIndex[i]].description,
      };

      const [result] = await conn.query("UPDATE users SET? WHERE id =?", [
        updateUser,
        id,
      ]);

      console.log("update user", updateUser);
    }

    await redisConn.del("user-update-index");
  }
});

app.listen(port, async () => {
  await initMySql();
  await initRedis();
  console.log(`Example app listening at http://localhost:${port}`);
});
