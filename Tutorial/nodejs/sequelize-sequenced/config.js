module.exports = {
  database: process.env.DB_NAME || "sequenced",
  user: process.env.DB_User || "root",
  password: process.env.DB_Pass || "admin",
  option: {
    dialect: process.env.DIALECT || "sqlite",
    storage: "./sequenced.sqlite",
  },
};
