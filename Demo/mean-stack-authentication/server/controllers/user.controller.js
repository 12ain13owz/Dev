const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const jwtSecret = process.env.JWT_SECREAT_KEY;

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      throw Object.assign(new Error("Email already exists!"), {
        func: "signup",
        status: 400,
      });

    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).send({ message: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      throw Object.assign(new Error("Email not found. Signup Please"), {
        func: "login",
        status: 400,
      });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      throw Object.assign(new Error("Invalid Email / Password"), {
        func: "login",
        status: 400,
      });

    const token = jwt.sign({ id: existingUser._id }, jwtSecret, {
      expiresIn: "35s", // 35 seconds
    });

    console.log("Generate token");

    if (req.cookies[`${existingUser._id}`])
      req.cookies[`${existingUser._id}`] = "";

    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    res
      .status(200)
      .send({ message: "Successfully Loggd In", user: existingUser, token });
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const cookies = req.headers["cookie"];
    if (!cookies)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "verifyToken",
        status: 404,
      });

    const token = cookies.split("=")[1];
    if (!token)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "verifyToken",
        status: 404,
      });

    jwt.verify(String(token), jwtSecret, (err, decoded) => {
      if (err)
        throw Object.assign(new Error("Invalid Token"), {
          func: "verifyToken",
          status: 400,
        });

      req.user = { id: decoded.id };
      next();
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "-password");

    res.status(200).send({ message: "ok", user });
  } catch (error) {
    next(error);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const cookies = req.headers["cookie"];
    if (!cookies)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "refreshToken",
        status: 404,
      });

    const prevToken = cookies.split("=")[1];
    if (!prevToken)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "refreshToken",
        status: 404,
      });

    jwt.verify(String(prevToken), jwtSecret, (err, decoded) => {
      if (err)
        throw Object.assign(new Error("Authentication failed"), {
          func: "refreshToken",
          status: 400,
        });

      res.clearCookie(`${decoded.id}`);
      req.cookies[`${decoded.id}`] = "";

      const token = jwt.sign({ id: decoded.id }, jwtSecret, {
        expiresIn: "35s", // 35 seconds
      });

      console.log("Refresh Generate token");

      res.cookie(String(decoded.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });

      req.id = decoded.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const cookies = req.headers["cookie"];
    if (!cookies)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "refreshToken",
        status: 404,
      });

    const prevToken = cookies.split("=")[1];
    if (!prevToken)
      throw Object.assign(new Error("Couldn't find token"), {
        func: "refreshToken",
        status: 404,
      });

    jwt.verify(String(prevToken), jwtSecret, (err, decoded) => {
      if (err)
        throw Object.assign(new Error("Authentication failed"), {
          func: "refreshToken",
          status: 400,
        });

      res.clearCookie(`${decoded.id}`);
      req.cookies[`${decoded.id}`] = "";
      res.status(200).send({ message: "Successfully logged out" });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, verifyToken, refreshToken, getUser, logout };
