const express = require("express");
const router = express.Router();

const Post = require("../models/post.model.js");

router.post("", (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post
    .save()
    .then((createPost) => {
      res.status(201).json({
        message: "Post added successfully",
        id: createPost._id,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating post" });
    });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) res.status(200).json(post);
      else res.status(404).json({ message: "Post not found!" });
    })
    .catch((err) => res.status(404).json("Not found post"));
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
