const Post = require("../models/post");
const User=require('../models/user');

module.exports.home= async function(req,res){
     
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    try{
        const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        const users = await User.find({});
      
        return res.render('home', {
            title: "SocialBridge Home",
            post: posts,
            all_users:users
        });
        
    }catch(err){
        console.error('Error in fetching posts', err);
        return;
    }
  
}