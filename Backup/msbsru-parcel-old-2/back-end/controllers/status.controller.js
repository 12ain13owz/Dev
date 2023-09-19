const db = require("../models/_index");

newStatus = async (req, res) => {
  try {
    const body = {
      name: req.body.name.replace(/^\s+|\s+$/gm, ""),
      remark: req.body.remark,
    };

    const result = await db.status.create(body);
    res.status(200).send({ message: "เพิ่มสถานะอุปกรณ์สำเร็จ", result });
  } catch (error) {
    console.log("Error newStatus : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

editStatus = async (req, res) => {
  try {
    const name = req.body.name.replace(/^\s+|\s+$/gm, "");

    if (req.body.check) {
      await db.status.update(
        {
          name: name,
          remark: req.body.remark,
          active: req.body.active,
        },
        { where: { id: req.body.id } }
      );
    } else {
      await db.status.update(
        {
          remark: req.body.remark,
          active: req.body.active,
        },
        { where: { id: req.body.id } }
      );
    }

    res.status(200).send({ message: "แก้ไขสถานะอุปกรณ์สำเร็จ" });
  } catch (error) {
    console.log("Error editStatus : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

getAllStatus = async (req, res) => {
  try {
    const result = await db.status.findAll();
    res.status(200).send(result);
  } catch (error) {
    console.log("Error getAllStatus : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const status = {
  newStatus: newStatus,
  editStatus: editStatus,
  getAllStatus: getAllStatus,
};

module.exports = status;
