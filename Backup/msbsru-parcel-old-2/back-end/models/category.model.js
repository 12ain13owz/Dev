const { sequelize, DataTypes } = require("./_sequelize");
const category = sequelize.define("category", {
  code: { type: DataTypes.STRING(3), unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  remark: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
});

module.exports = category;
