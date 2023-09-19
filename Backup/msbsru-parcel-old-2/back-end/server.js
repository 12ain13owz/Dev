const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const db = require("./models/_index");
const routesUser = require("./routes/user.routes");
const config = require("./config/db.config");
const app = express();
const port = process.env.PORT || config.port;
const public = path.join(__dirname, "public");
const corOptions = {
  origin: ["https://bsru-parcel.web.app", "http://localhost:4200"],
  optionsSuccessStatus: 200,
};

app.use(cors(corOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(public));
app.use("/api/user", routesUser);

app.get("", (req, res) => {
  res.status(200).send({ message: "Server is running." });
});

let server;
db.sequelize.sync().then(() => {
  server = app.listen(port, () => {
    generateAdmin();
    console.log(`Server is running on port ${port}.`);
  });
});

const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
sigs.forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit();
  });
});

let bcrypt = require("bcrypt");

async function generateAdmin() {
  const result = await db.account.findOne({
    where: {
      username: "admin",
    },
  });

  if (result) return;

  const password = bcrypt.hashSync("123456", 10);
  const account = {
    username: "admin",
    password: password,
    firstname: "Phaiboon",
    lastname: "Withanthamrong",
    role: 0,
  };

  db.account.create(account);
}
