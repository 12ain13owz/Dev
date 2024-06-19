import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export async function connectToDatabase() {
  const dbUri = config.get<string>("dbUri");
  const dbName = config.get<string>("dbName");

  log.info("Connecting to database");
  try {
    await mongoose.connect(dbUri, { dbName: dbName });
    log.info("Connecting Successfully");
  } catch (error: any) {
    log.error(error.message);
    console.log(error);
    process.exit(1);
  }
}
