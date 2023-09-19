const { sequelize, DataTypes } = require("./_sequelize");
const user = sequelize.define("user", {
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = user;
