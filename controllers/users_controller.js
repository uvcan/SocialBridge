const User =require('../models/user');
const fs=require('fs');
const path=require('path');


//Rending the Profile page of the user
module.exports.profile=async function(req,res){
    const users=await User.findById(req.params.id);
    return res.render('user_profile',{
        title:"Profile",
        profile_users:users
    });
}


module.exports.update=async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                
                if(err){console.log('error in updating the profile using multer')}

                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of uploaded file into the avatar
                    user.avatar=User.avatartPath + '/' + req.file.filename ;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            console.log('error in finding the user using multer',err);
        }
    }else{
        return res.status(404).send('Unautherized');
    }
}

//Rendering the SighIn page of the user
module.exports.signIn=function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"SignIn"
    });
}



//Rendering the sigh Up page of the user
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"SignUp"
    });
}


module.exports.create=async function(req,res){
    try{
        if(req.body.password != req.body.cofirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({email:req.body.email});
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
          } else {
            return res.redirect('back');
          }

    }catch(err){
        console.error('Error in creating user:', err);
        return ;

    }
}



module.exports.createSession=function(req,res){
    req.flash('success','log in successfully');
    return res.redirect('/');
}

module.exports.destroySession=async function(req,res){
    await req.logout(function(){});
    req.flash('success','logged out !!');

    return res.redirect('/');
}