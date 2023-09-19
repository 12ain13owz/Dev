const account = require("./account.controller");
const item = require("./item.controller");
const category = require("./category.controller");
const status = require("./status.controller");
const stock = require("./stock.controller");
const generate = require("./generate.controller");

module.exports = {
  account,
  item,
  category,
  status,
  stock,
  generate,
};
