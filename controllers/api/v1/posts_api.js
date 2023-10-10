const Post=require('../../../models/post');
const Comment=require('../../../models/post');

module.exports.index=async function(req,res){

    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    });
}



module.exports.destroy=async function(req,res){
    try{
        const post= await Post.findById( req.params.id);
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});

            return res.json(200,{
                message:"Post and associated comment deleted sucessfully"
            });
        
    }catch(err){
        console.log('*******',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
   
}