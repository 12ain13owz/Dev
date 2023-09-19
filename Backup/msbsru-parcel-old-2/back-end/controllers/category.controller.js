const db = require("../models/_index");

newCategory = async (req, res) => {
  try {
    const body = {
      code: req.body.code.replace(/^\s+|\s+$/gm, ""),
      name: req.body.name.replace(/^\s+|\s+$/gm, ""),
      remark: req.body.remark,
    };

    const result = await db.category.create(body);
    res.status(200).send({ message: "เพิ่มประเภทอุปกรณ์สำเร็จ", result });
  } catch (error) {
    console.log("Error newCategory : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

editCategory = async (req, res) => {
  try {
    const code = req.body.code.replace(/^\s+|\s+$/gm, "");
    const name = req.body.name.replace(/^\s+|\s+$/gm, "");

    if (req.body.check) {
      await db.category.update(
        {
          code: code,
          name: name,
          remark: req.body.remark,
          active: req.body.active,
        },
        { where: { id: req.body.id } }
      );
    } else {
      await db.category.update(
        {
          name: name,
          remark: req.body.remark,
          active: req.body.active,
        },
        { where: { id: req.body.id } }
      );
    }

    res.status(200).send({ message: "แก้ไขประเภทอุปกรณ์สำเร็จ" });
  } catch (error) {
    console.log("Error editCategory : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

getAllCategory = async (req, res) => {
  try {
    const result = await db.category.findAll();
    res.status(200).send(result);
  } catch (error) {
    console.log("Error getAllCategory : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const category = {
  newCategory: newCategory,
  editCategory: editCategory,
  getAllCategory: getAllCategory,
};

module.exports = category;
