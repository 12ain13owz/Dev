const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );
  const publicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;

  jwt.verify(accessToken, publicKey, (err, decoded) => {
    if (err) return res.send({ message: "!Token Expired" });

    next();
  });
};

module.exports = { token };
