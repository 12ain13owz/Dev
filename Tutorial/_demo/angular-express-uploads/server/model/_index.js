const { Sequelize, sequelize } = require("./_sequelize");
const upload = require("./upload");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.upload = upload;

module.exports = db;
