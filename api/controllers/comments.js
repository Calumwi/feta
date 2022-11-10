const Comment = require('../models/comment');
const TokenGenerator = require('../models/token_generator');

const CommentsController = {
  Index: (req, res) => {
    let post_id = req.query.post_id //this will look something like GET/comment?post_id=8787adsg6968dsg5adf
    Comment.find( {"post": post_id }, (err, comments) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token, commentUserId: req.user_id });
    }).sort({ _id : -1 });
  },
  

  Create: (req, res) => {
    const comment = new Comment(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  }
}

module.exports = CommentsController;