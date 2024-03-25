const express = require("express");
const app = express();

const { item } = require("./model");
const { sequelize } = require("./model");

sequelize.sync();
