const config = require("config");
const jwt = require("jsonwebtoken");

const privateKey = config.get("PRIVATE_KEY");
const publicKey = config.get("PUBLIC_KEY");

const token = jwt.sign({ foo: "12345" }, privateKey, { algorithm: "RS256" });
jwt.verify(token, publicKey, function (err, decoded) {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Success", decoded);
  }
});
