const { sequelize, DataTypes } = require("./sequelize");
const account = sequelize.define("account", {
  username: { type: DataTypes.STRING(50) },
  password: { type: DataTypes.STRING(50) },
  firstname: { type: DataTypes.STRING(50) },
  lastname: { type: DataTypes.STRING(50) },
});

module.exports = account;
