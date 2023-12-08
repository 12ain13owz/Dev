const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Post = require("./models/post.model");
const pass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://dbPost:${pass}@atlascluster.m4yr7j0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mongo atlas");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createPost) => {
    res.status(201).json({
      message: "Post added successfully",
      id: createPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
