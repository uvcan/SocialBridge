const User =require('../models/user');

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
        const user=await User.findByIdAndUpdate(req.params.id,req.body);
        user.save();
        return res.redirect('back');
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
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
          } else {
            return res.redirect('back');
          }

    }catch(err){
        console.error('Error in creating user:', err);
        return res.redirect('back');

    }
}



module.exports.createSession=function(req,res){
   return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        console.log('Error in logging out');
    });

    return res.redirect('/');
}