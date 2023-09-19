const db = require("../models/_index");
const upload = require("./upload.middleware");

checkAccountID = async (req, res, next) => {
  try {
    const result = await db.account.findByPk(req.body.id);
    if (!result) throw { status: 404, message: "Error! ไม่พบบัญชีผู้ใช้งาน" };

    next();
  } catch (error) {
    console.log("Error checkAccountID : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkDuplicateUsername = async (req, res, next) => {
  try {
    const username = req.body.username.replace(/^\s+|\s+$/gm, "");
    const result = await db.account.findOne({ where: { username } });

    if (result) throw { status: 400, message: "Erro! ชื่อ Username ซ้ำ" };

    next();
  } catch (error) {
    console.log("Error checkDuplicateUsername : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkItemID = async (req, res, next) => {
  try {
    const result = await db.item.findByPk(req.body.id);
    if (!result) throw { status: 404, message: "Error! ไม่พบอุปกรณ์" };

    next();
  } catch (error) {
    console.log("Error checkItemID : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkDuplicateItem = async (req, res, next) => {
  try {
    const code = req.body.code.replace(/^\s+|\s+$/gm, "");
    const item = await db.item.findOne({
      where: { code },
    });

    if (item) {
      if (req.file) upload.removeImage(req.file.path);
      throw { status: 400, message: "Error! รหัสซ้ำ" };
    }
    next();
  } catch (error) {
    console.log("Error checkDuplicateItem : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkCategoryID = async (req, res, next) => {
  try {
    const result = await db.category.findByPk(req.body.id);
    if (!result) throw { status: 404, message: "Error! ไม่พบประเภทอุปกรณ์" };

    req.db = {};
    req.db.category = result;
    next();
  } catch (error) {
    console.log("Error checkCategoryID : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkDuplicateCategory = async (req, res, next) => {
  try {
    if (req.body.check === undefined) req.body.check = true;
    if (!req.body.check) return next();
    const code = req.body.code.replace(/^\s+|\s+$/gm, "");

    if (req.db.category !== undefined) {
      if (code == req.db.category.code) {
        req.body.check = false;
        return next();
      }
    }

    const category = await db.category.findOne({
      where: { code },
    });

    if (category) throw { status: 400, message: "Error! รหัสประเภทอุปกรณ์ซ้ำ" };
    next();
  } catch (error) {
    console.log("Error checkDuplicateCategory : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkStatusID = async (req, res, next) => {
  try {
    const result = await db.status.findByPk(req.body.id);
    if (!result) throw { status: 404, message: "Error! ไม่พบสถานะอุปกรณ์" };

    req.db = {};
    req.db.status = result;
    next();
  } catch (error) {
    console.log("Error checkStatusID : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

checkDuplicateStatus = async (req, res, next) => {
  try {
    if (req.body.check === undefined) req.body.check = true;
    if (!req.body.check) return next();
    const name = req.body.name.replace(/^\s+|\s+$/gm, "");

    if (req.db.status !== undefined) {
      if (name == req.db.status.name) {
        req.body.check = false;
        return next();
      }
    }

    const status = await db.status.findOne({
      where: { name },
    });

    if (status) throw { status: 400, message: "Error! ชื่อสถานะอุปกรณ์ซ้ำ" };
    next();
  } catch (error) {
    console.log("Error checkDuplicateStatus : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const verify = {
  checkAccountID: checkAccountID,
  checkDuplicateUsername: checkDuplicateUsername,
  checkItemID: checkItemID,
  checkDuplicateItem: checkDuplicateItem,
  checkCategoryID: checkCategoryID,
  checkDuplicateCategory: checkDuplicateCategory,
  checkStatusID: checkStatusID,
  checkDuplicateStatus: checkDuplicateStatus,
};

module.exports = verify;
