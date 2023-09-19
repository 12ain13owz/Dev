const { sequelize, DataTypes } = require("./_sequelize");
const item_seq = sequelize.define("item_seq", {
  sequence: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = item_seq;
