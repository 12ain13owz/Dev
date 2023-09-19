const { sequelize, DataTypes } = require("./_sequelize");
const role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING },
});

module.exports = role;
