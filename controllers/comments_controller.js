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


module.exports.destroy=async function(req, res){
  try{
    const comment=Comment.findById(req.params.id);
    if(comment.user == req.user.id){
      const postId=comment.post;
      comment.deleteOne();
      Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
      return res.redirect('back');

  }
  return res.redirect('back');
  }catch(err){
    console.log('Error in deleting the user ');
  }
  
}