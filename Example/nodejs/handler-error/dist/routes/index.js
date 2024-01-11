"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    try {
        throw Object.assign(Error("User already exists!"), {
            func: "Test Function Error",
            status: 400,
        });
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
