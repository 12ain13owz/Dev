const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/_index");

verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token)
      throw { status: 403, message: "Error! ไม่พบ Token กรุณาล็อกอิน" };

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err)
        throw { status: 401, message: "Error! Token หมดอายุกรุณาล็อกอิน" };

      req.userID = decoded.id;
      next();
    });
  } catch (error) {
    console.log("Error verifyToken : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

isActive = async (req, res, next) => {
  try {
    const result = await db.account.findOne({
      where: { id: req.userID, active: true },
    });

    if (!result)
      throw {
        status: 401,
        message: "Error! บัญชีนี้ไม่ได้รับอนุญาติให้ใช้งาน",
      };

    req.db = {};
    req.db.account = result;
    next();
  } catch (error) {
    console.log("Error isActive : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

isAdmin = async (req, res, next) => {
  try {
    if (req.db.account.role !== 0)
      throw { status: 401, message: "Error! ไม่ได้รับอนุญาต" };

    next();
  } catch (error) {
    console.log("Error isAdmin : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isActive: isActive,
  isAdmin: isAdmin,
};

module.exports = authJwt;
