const config = require("config");
const jwt = require("jsonwebtoken");

const rsaPrivateKey = config.get("PRIVATE_KEY");
const rasPublicKey = config.get("PUBLIC_KEY");

const token = jwt.sign({ foo: "bar" }, rsaPrivateKey, { algorithm: "RS256" });
jwt.verify(token, rasPublicKey, function (err, decoded) {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Success", decoded);
  }
});
