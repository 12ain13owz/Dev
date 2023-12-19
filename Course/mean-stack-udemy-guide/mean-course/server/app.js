const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/post.routes");
const pass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://dbPost:${pass}@atlascluster.m4yr7j0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mongo atlas");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", postsRoutes);

module.exports = app;
