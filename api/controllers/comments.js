const post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentController = {
  Index: (req, res) => {
    Post.comment.find(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token });
    }).sort({ _id : -1 });
  },
  Create: (req, res) => {
    const comment = new Post.comment(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = CommentController;
