const User=require('../../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createSession= async function(req,res){
   
    try{

        const user=await User.findOne({email:req.body.email});
        console.log(user);
        if(!user || user.password != req.body.password){
            
            return res.json(422,{
                message:"Inavalid username / password"
            });

        }

        return res.json(200 , {
            message:"Sign in sucessfully , here is your token please use carefully",
            data:{
                token:jwt.sign(user.json(), 'socilaBridge' ,{expiresIn:10000})
            }
        })

    }catch(err){
        console.log('*******',err);
        return res.json(500,{
            message:"Internal server error"
        }); 
    }

}