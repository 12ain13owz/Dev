const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const config = require("./config");
const router = require("./routes");
const model = require("./models");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: config.origin },
});
const port = process.env.PORT || config.port;
const connect = require("./listeners/connect.listeners");
const account = require("./listeners/account.listeners");

const onConnect = (socket) => {
  connect(io, socket);
  account(io, socket);
};

app.use(cors({ origin: config.origin }));
app.use(logger("dev"));
app.use(express.json());
app.use("/api", router);

model.sequelize.sync().then(() => {
  io.on("connection", onConnect);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
