const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

const app = express();
const userRouter = require("./routes/user.routes");
const handlerError = require("./middleware/handler-error.middleware");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use(handlerError);

mongoose
  .connect(`mongodb://user_mongo:pass_mongo@localhost:27017/`)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database is connected! Listening to localhost 3000");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
