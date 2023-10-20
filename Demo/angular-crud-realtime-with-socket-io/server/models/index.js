const { Sequelize, sequelize } = require("./sequelize");
const account = require("./account.model");
const model = {};

model.Sequelize = Sequelize;
model.sequelize = sequelize;
model.account = account;

module.exports = model;
