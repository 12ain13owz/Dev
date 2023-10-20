const { Sequelize, DataTypes } = require("sequelize");

const config = require("../config");
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config.option
);

module.exports = {
  Sequelize,
  sequelize,
  DataTypes,
};
