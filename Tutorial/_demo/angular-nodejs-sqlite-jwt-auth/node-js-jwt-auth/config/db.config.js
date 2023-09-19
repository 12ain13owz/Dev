module.exports = {
  port: 3000,
  database: process.env.DB_NAME || "testdb",
  user: process.env.DB_User || "root",
  password: process.env.DB_Pass || "123456",
  option: {
    dialect: process.env.DIALECT || "sqlite",
    storage: "./testdb.sqlite",
  },
};
