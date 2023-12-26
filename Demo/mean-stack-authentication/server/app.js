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
const password = process.env.DB_PASSWORD;
const userRouter = require("./routes/user.routes");
const handlerError = require("./middleware/handler-error.middleware");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use(handlerError);

mongoose
  .connect(
    `mongodb+srv://auth:${password}@cluster0.jycoejc.mongodb.net/auth?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Database is connected! Listening to localhost 5000");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
