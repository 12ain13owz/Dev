import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export async function connectToDatabase() {
  const dbUri = config.get<string>("dbUri");
  log.info("Connecting to database");
  try {
    await mongoose.connect(dbUri);
    log.info("Connecting Successfully");
  } catch (error: any) {
    log.error(error.message);
    process.exit(1);
  }
}
