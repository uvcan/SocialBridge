const Post = require("../models/post");

module.exports.home= async function(req,res){
     
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    try{
        const posts = await Post.find({}).populate('user').exec();

        return res.render('home', {
            title: "SocialBridge Home",
            post: posts
        });
        
    }catch(err){
        console.error('Error in fetching posts', err);
    }
  
}