const jwt = require("jsonwebtoken");

const signAccessToken = () => {
  const payload = {
    id: 1,
    username: "admin",
    firstname: "dryst",
    lastname: "alex",
  };
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "30s",
  });
};

module.exports = signAccessToken;
