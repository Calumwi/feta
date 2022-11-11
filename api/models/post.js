const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/; //no <>
      },
    },
  },
  date: { type: Date, default: Date.now },
  img: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
