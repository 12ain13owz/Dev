const { Sequelize, sequelize } = require("./_sequelize");
const account = require("./account.model");
const item = require("./item.model");
const item_seq = require("./item_seq.model");
const log = require("./log.model");
const category = require("./category.model");
const status = require("./status.model");
const stock = require("./stock.model");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.errorMessage = "Error (500)! Bad request.";

db.account = account;
db.item = item;
db.item_seq = item_seq;
db.log = log;
db.category = category;
db.status = status;
db.stock = stock;

module.exports = db;
