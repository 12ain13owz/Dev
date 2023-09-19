const model = require("../models");

const getAccount = async (req, res) => {
  try {
    const result = await model.account.findAll({
      attributes: { exclude: "updatedAt" },
    });

    res.status(200).send(result);
  } catch (error) {
    console.log("Error getAccount: ", error.message);
    res.status(500).send({ message: "Error" });
  }
};

const addAccount = async (req, res) => {
  try {
    const result = await model.account.create(req.body);
    const io = req.app.get("io");

    io.emit("addData", result.dataValues);
    res.status(200).send({ message: "Add Success" });
  } catch (error) {
    console.log("Error addAccount: ", error.message);
    res.status(500).send({ message: "Error" });
  }
};

module.exports = {
  getAccount,
  addAccount,
};
