const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"  
            });
        }

        return res.redirect('back');

    }catch(err){
        console.log('error in creting the post',err);
        return; 
    }
}

module.exports.destroy=async function(req,res){
    try{
        const post= await Post.findById( req.params.id);
        if (post.user == req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted"
                });
            }

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in deleting the post');
        return;
    }
   
}