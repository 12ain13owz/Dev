const config = require("../config/auth.config");
const db = require("../models/_index");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

onLogin = async (req, res) => {
  try {
    const username = req.body.username.replace(/^\s+|\s+$/gm, "");
    const password = req.body.password;
    const remember = req.body.remember;

    const account = await db.account.findOne({ where: { username } });
    if (!account) throw { status: 404, message: "ไม่พบบัญชีผู้ใช้งาน!" };

    const passwordIsValid = bcrypt.compareSync(password, account.password);
    if (!passwordIsValid)
      throw { status: 401, message: "Username หรือ Passwword ไม่ตรงกัน!" };

    if (!account.active)
      throw { status: 401, message: "บัญชีนี้ไม่ได้รับอนุญาติให้ใช้งาน" };

    let expires = 86400; // 24 Hour
    if (remember) expires = 60 * 60 * 24 * 30;
    expires += expiresTimeToMidnight();

    let token = jwt.sign({ id: account.id }, config.secret, {
      expiresIn: expires,
    });

    res.status(200).send({
      username: account.username,
      role: account.role,
      accessToken: token,
    });
  } catch (error) {
    console.log("Error onLogin : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

newAccount = async (req, res) => {
  try {
    const username = req.body.username.replace(/^\s+|\s+$/gm, "");
    const body = {
      username: username,
      password: hashPassword(req.body.password, 10),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role,
      remark: req.body.remark,
    };

    const result = await db.account.create(body);
    delete result.dataValues.password;
    res.status(200).send({ message: "เพิ่มบัญชีผู้ใช้งานสำเร็จ", result });
  } catch (error) {
    console.log("Error newAccount : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

editAccount = async (req, res) => {
  try {
    await db.account.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        active: req.body.active,
        remark: req.body.remark,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.status(200).send({ message: "แก้ไขบัญชีผู้ใช้งานสำเร็จ" });
  } catch (error) {
    console.log("Error editAccount : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

editAccountPassword = async (req, res) => {
  try {
    const body = {
      password: hashPassword(req.body.password, 10),
    };

    await db.account.update(body, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).send({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
  } catch (error) {
    console.log("Error editAccountPassword : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

getAllAccount = async (req, res) => {
  try {
    const result = await db.account.findAll({
      attributes: { exclude: "password" },
    });
    res.status(200).send(result);
  } catch (error) {
    console.log("Error getAllAccount : ", error.message);

    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send(db.errorMessage);
  }
};

const account = {
  onLogin: onLogin,
  newAccount: newAccount,
  editAccount: editAccount,
  editAccountPassword: editAccountPassword,
  getAllAccount: getAllAccount,
};

module.exports = account;

function expiresTimeToMidnight() {
  const date = new Date();
  const hour = date.getHours();
  const day = 86400;
  const second = 60 * 60 * hour;
  const time = day - second;

  return time;
}

function hashPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}
