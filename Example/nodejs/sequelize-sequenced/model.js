const config = require("./config");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.user,
  config.password,
  config.option
);

const item = sequelize.define("item", {
  code: { type: DataTypes.INTEGER, primaryKey: true },
});

const item_seq = sequelize.define("item_seq", {
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: Sequelize.literal("nextval('item.code')"),
  },
});

module.exports = { item, item_seq, sequelize };
