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
    res.status(200).send({ meaage: "Add Success", result });
  } catch (error) {
    console.log("Error addAccount: ", error.message);
    res.status(500).send({ message: "Error" });
  }
};

const editAccount = async (req, res) => {
  try {
    const body = req.body;
    await model.account.update(body, {
      where: { id: req.body.id },
    });
    res.status(200).send({ message: "Update Success", result: body });
  } catch (error) {
    console.log("Error editAccount: ", error.message);
    res.status(500).send({ message: "Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    await model.account.destroy({
      where: { id: id },
    });
    res.status(200).send({ message: "Delete Success", id: id });
  } catch (error) {
    console.log("Error deleteAccount: ", error.message);
    res.status(500).send({ message: "Error" });
  }
};

module.exports = {
  getAccount,
  addAccount,
  editAccount,
  deleteAccount,
};
