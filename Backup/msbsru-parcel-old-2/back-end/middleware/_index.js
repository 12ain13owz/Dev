const authJwt = require("./auth.middleware");
const verify = require("./verify.middleware");
const upload = require("./upload.middleware");
const generate = require("./generate.middleware");

module.exports = {
  authJwt,
  verify,
  upload,
  generate,
};
