const { Sequelize, sequelize } = require("./_sequelize");
const user = require("./user.model");
const role = require("./role.model");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = user;
db.role = role;

db.user.belongsToMany(db.role, {
  through: "user_role",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.role.belongsToMany(db.user, {
  through: "user_role",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
