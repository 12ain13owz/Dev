const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user.model.js");
const validate = require("../middleware/validate.js");
const userValidate = require("../schema/user.schema");

router.get("/ok", (req, res, next) => {
  res.sendStatus(200);
});

router.post("/signup", (req, res, next) => {
  const error = validate(userValidate, req, res);
  if (error) return res.status(400).send(error);

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "Auth failed" });

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) return res.status(401).json({ message: "Auth failed" });

      const token = jwt.sign(
        { email: result.email, userId: result._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token });
    })
    .catch((error) => {
      return res.status(401).json({ message: "Auth failed" });
    });
});

module.exports = router;
