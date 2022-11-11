const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/; //no <>
      },
    },
  },
  date: { type: Date, default: Date.now },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
