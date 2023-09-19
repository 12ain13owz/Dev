import express from "express";
import config from "config";
import morgan from "morgan";
import log from "./utils/logger";
import router from "./routes";
import { connectDatabase } from "./utils/connect-db";

const app = express();
const port = config.get("port");

app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
  connectDatabase();
});
