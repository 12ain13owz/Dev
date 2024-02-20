import express from "express";
import morgan from "morgan";

import config from "../config";
import log from "./utils/logger";
import router from "./routes";
import handlerError from "./middlewares/handler-error.middleware";
import { dbConnect, redisConnect } from "./utils/connect";

const app = express();
const port = config.port;

app.use(morgan("dev"));
app.use(router);
app.use(handlerError);

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
  dbConnect();
});
