const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/db.config");
const db = require("./models");
const routesAuth = require("./routes/auth.routes");
const routesUser = require("./routes/user.routes");

let corOptions = {
  origin: "http://localhost:4200",
};

db.sequelize.sync();
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routesAuth);
app.use("/", routesUser);

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database");
//   intial();
// });

// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

function intial() {
  db.role.create({
    id: 1,
    name: "user",
  });

  db.role.create({
    id: 2,
    name: "moderator",
  });

  db.role.create({
    id: 3,
    name: "admin",
  });
}
