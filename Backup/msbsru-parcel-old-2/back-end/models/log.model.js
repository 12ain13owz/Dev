const { sequelize, DataTypes } = require("./_sequelize");
const log = sequelize.define("log", {
  item_id: { type: DataTypes.INTEGER, allowNull: false },
  item_code: { type: DataTypes.STRING(20), allowNull: false },
  account_id: { type: DataTypes.INTEGER, allowNull: false },
  account_name: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.BOOLEAN }, // true = เพิ่ม, false = ตัด stock
});

module.exports = log;
