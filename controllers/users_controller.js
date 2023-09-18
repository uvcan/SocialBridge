//Rending the Profile page of the user
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"Profile"
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


module.exports.create=function(req,res){
    //To Do later
}



module.exports.createSession=function(req,res){
    //To Do Later
}