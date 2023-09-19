const { sequelize, DataTypes } = require("./_sequelize");
const account = sequelize.define("account", {
  username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  firstname: { type: DataTypes.STRING(50) },
  lastname: { type: DataTypes.STRING(50) },
  role: { type: DataTypes.INTEGER, allowNull: false }, // 0 = admin / 1 = user
  remark: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
});

module.exports = account;
