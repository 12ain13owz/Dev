require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;
const signAccessTokee = require("./utils/jwt");
const verify = require("./middleware/verify");

app.use(cors());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/token", (req, res) => {
  const accessToken = signAccessTokee();
  res.send({ token: accessToken });
});

app.get("/verify", verify.token, (req, res) => {
  res.send({ message: "ok" });
});
