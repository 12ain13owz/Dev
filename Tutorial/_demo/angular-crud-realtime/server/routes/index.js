const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/account", controllers.account.getAccount);
router.post("/account", controllers.account.addAccount);

module.exports = router;
