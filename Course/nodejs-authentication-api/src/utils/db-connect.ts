import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export default async function dbConnect() {
  try {
    const dbURL = config.get<string>("dbURL");
    await mongoose.connect(dbURL);
    log.info("Connected to Database successfully");
  } catch (error) {
    log.error("dbConnect:", error);
    process.exit(1);
  }
}
