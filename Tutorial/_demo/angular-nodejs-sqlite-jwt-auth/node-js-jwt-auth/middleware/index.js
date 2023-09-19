const authJwt = require("./auth.middleware");
const verifySignUp = require("./verify.middleware");

module.exports = {
  authJwt,
  verifySignUp,
};
