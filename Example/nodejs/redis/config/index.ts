require("dotenv").config();
import { Dialect } from "sequelize";

interface DatabaseConfig {
  dialect: Dialect;
  storage: string;
}

interface AppConfig {
  port: number;
  database: DatabaseConfig;
  accessTokenPrivateKey: string;
  refrestTokenPrivateKey: string;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3500,
  database: {
    dialect: "sqlite",
    storage: "./database/test_redis.sqlite",
  },
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || "",
  refrestTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || "",
};

export default config;
