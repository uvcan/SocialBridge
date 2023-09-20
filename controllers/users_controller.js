const User =require('../models/user');

//Rending the Profile page of the user
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"Profile",
    });
}

//Rendering the SighIn page of the user
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"SignIn"
    });
}



//Rendering the sigh Up page of the user
module.exports.signUp=function(req,res){
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