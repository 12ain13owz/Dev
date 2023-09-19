require("dotenv").config();

import express from "express";
import config from "config";
import morgan from "morgan";
import { connectToDatabase } from "./utils/connect.db";
import log from "./utils/logger";
import router from "./routes/index";
import deserialUser from "./middleware/deserializeUser";

const app = express();
const port = config.get("port");

app.use(morgan("dev"));
app.use(express.json());
app.use(deserialUser);
app.use(router);

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDatabase();
});
