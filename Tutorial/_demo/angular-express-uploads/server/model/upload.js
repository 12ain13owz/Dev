const { sequelize, DataTypes } = require("./_sequelize");
const upload = sequelize.define("upload", {
  path: { type: DataTypes.STRING },
});

module.exports = upload;
