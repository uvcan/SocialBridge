const Post=require('../models/post');


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