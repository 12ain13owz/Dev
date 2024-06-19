import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger";

export async function connectDatabase() {
  const url = config.get<string>("dbURL");
  log.info("Connected to MongoDB");

  try {
    await mongoose.connect(url, { dbName: "tutarial-crud" });
    log.info("Connected Successfully");
  } catch (error: any) {
    log.error(error.message);
    process.exit(1);
  }
}
