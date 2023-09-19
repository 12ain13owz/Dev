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

app.use(cors({ origin: config.origin }));
app.use(logger("dev"));
app.use(express.json());
app.use("/api", router);
app.set("io", io);

model.sequelize.sync().then(() => {
  io.on("connection", async (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    const count = io.engine.clientsCount;
    console.log("Clients count: " + count);
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
