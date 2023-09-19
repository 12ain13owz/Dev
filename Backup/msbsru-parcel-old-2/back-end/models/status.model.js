const { sequelize, DataTypes } = require("./_sequelize");
const status = sequelize.define("status", {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  remark: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
});

module.exports = status;
