const Comment=require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      
      post.comments.push(comment);
      await post.save();

      return res.redirect('/');
    }
  } catch (err) {
    // Handle errors here
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

