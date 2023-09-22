const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
        const newPost=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');

    }catch(err){
        console.log('error in creting the post',err);
        return; 
    }
}

module.exports.destroy=async function(req,res){
    try{
        const post= await Post.findById( req.params.id);
        console.log(req.user.id);
        console.log(post.user);
        if(post.user == req.user._id){
            post.remove();
            Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in deleting the post');
    }
   
}