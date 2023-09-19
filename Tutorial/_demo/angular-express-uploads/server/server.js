const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const config = require("./config/config");
const db = require("./model/_index");
const routes = require("./routes/upload.routes");
const port = process.env.PORT || config.port;
const public = path.join(__dirname, "public");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(public));
app.use("/api", routes);

app.get("", (req, res) => {
  res.status(200).send({ message: "Server is running." });
});

let server;
db.sequelize.sync().then(() => {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
});

const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];

sigs.forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit();
  });
});
