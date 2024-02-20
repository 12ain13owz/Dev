import sequelize from "./sequelize";
import "../models";
import log from "./logger";
import { createClient } from "redis";

export async function dbConnect() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    log.info("Connected to Database successfully");
  } catch (error) {
    const e = error as Error;
    log.error(`dbConnect: ${e.message}`);
    process.exit(1);
  }
}

export async function redisConnect() {
  try {
    const client = await createClient()
      .on("error", (err) => {
        client.disconnect();
        console.log(err);
      })
      .connect();

    // await client.connect();
    log.info("Connected to Redis successfully");
  } catch (error) {
    const e = error as Error;
    log.error(`redisConnect: ${e.message}`);
    process.exit(1);
  }
}
