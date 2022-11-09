const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  img: String,
  comments: [{
    text: String
  }]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


