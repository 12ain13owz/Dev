const path = require("path");
const db = require("../models/_index");
const { upload } = require("../middleware/_index");

newItem = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const date = req.body.received_date.split("/");
    const received_date = new Date(`${date[1]}-${date[0]}-${date[2]}`);
    let image_path = null;
    if (req.file) image_path = req.imagePath;

    const body = {
      code: req.body.code,
      old_code: req.body.old_code,
      track_id: req.track,
      received_date: received_date,
      detail: req.body.detail,
      image_path: image_path,
      category_id: Number(req.body.category_id),
      status_id: Number(req.body.status),
      account_id: req.userID,
    };

    const item = await db.item.create(body, { transaction: transaction });
    await db.log.create(
      {
        item_id: item.id,
        item_code: req.track,
        account_id: req.userID,
        account_name: `${req.db.account.firstname} ${req.db.account.lastname}`,
        status: true,
      },
      { transaction: transaction }
    );

    await transaction.commit();
    res.status(200).send({ message: "เพิ่มอุปกรณ์สำเร็จ", item });
  } catch (error) {
    console.log("Error newItem : ", error.message);

    if (req.file) upload.removeImage(req.file.path);
    await transaction.rollback();

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send("Error (500)! Bad request.");
  }
};

editItem = async (req, res) => {
  try {
    //let path = null;
    if (req.file) {
      const a = path.basename(req.body.image_path);
      console.log(a);
      console.log(req.file.originalname);
    }

    res.status(200).send({ message: "แก้ไขอุปกรณ์สำเร็จ", item });
  } catch (error) {
    console.log("Error newItem : ", error.message);

    if (req.file) upload.removeImage(req.file.path);
    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send("Error (500)! Bad request.");
  }
};

getDataSetItem = async (req, res) => {
  try {
    const category = await db.category.findAll({
      where: { active: true },
      attributes: ["id", "code", "name"],
    });
    const status = await db.status.findAll({
      where: { active: true },
      attributes: ["id", "name"],
    });

    res.status(200).send({ category, status });
  } catch (error) {
    console.log("Error getDataSetItem : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send("Error (500)! Bad request.");
  }
};

getAllItem = async (req, res) => {
  try {
    const result = await db.item.findAll();
    res.status(200).send(result);
  } catch (error) {
    console.log("Error getAllItem : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send("Error (500)! Bad request.");
  }
};

getItemByDate = async (req, res) => {
  try {
    const Op = db.Sequelize.Op;
    const result = await db.item.findAll({
      where: {
        createdAt: {
          [Op.between]: [req.params.start, req.params.end],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send(result);
  } catch (error) {
    console.log("Error getItemByDate : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send("Error (500)! Bad request.");
  }
};

const item = {
  newItem: newItem,
  editItem: editItem,
  getDataSetItem: getDataSetItem,
  getAllItem: getAllItem,
  getItemByDate: getItemByDate,
};

module.exports = item;
