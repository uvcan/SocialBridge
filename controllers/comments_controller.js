const Comment=require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      
      post.comments.push(comment);
      await post.save();
       
      //  await comment.populate('user', 'name email').exec();
       comment = await comment.populate('user', 'name email');
       console.log(comment.email);
       commentsMailer.newComment(comment);

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
    const comment= await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
      
      const postId=comment.post;
      comment.deleteOne();
      Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
      return res.redirect('back');

    }else{
        return res.redirect('back');
      }

  }
 
  catch(err){
    console.log('Error in deleting the user ',err);
    return;
  }
  
}
