const { sequelize, DataTypes } = require("./_sequelize");
const item = sequelize.define("item", {
  code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  old_code: { type: DataTypes.STRING(50) },
  track_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  received_date: { type: DataTypes.DATEONLY },
  detail: { type: DataTypes.STRING, allowNull: false },
  print: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // เคยปริ้น Barcode แล้วหรือไม่
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // สถานะ stock ตัด/ไม่ตัด
  remark: { type: DataTypes.STRING },
  image_path: { type: DataTypes.STRING },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  status_id: { type: DataTypes.INTEGER, allowNull: false },
  account_id: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = item;
