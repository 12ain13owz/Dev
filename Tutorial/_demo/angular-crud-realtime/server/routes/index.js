const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/account", controllers.account.getAccount);
router.post("/account", controllers.account.addAccount);
router.put("/account", controllers.account.editAccount);
router.delete("/account/:id", controllers.account.deleteAccount);

module.exports = router;
