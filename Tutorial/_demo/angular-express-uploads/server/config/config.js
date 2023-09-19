module.exports = {
  port: 3000,
  database: process.env.DB_NAME || "upload",
  user: process.env.DB_User || "root",
  password: process.env.DB_Pass || "admin",
  option: {
    dialect: process.env.DIALECT || "sqlite",
    storage: "./database/upload.sqlite",
  },
};
