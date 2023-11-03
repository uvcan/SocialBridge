const nodemailer=require('../config/nodemailer');
const Comment=require('../models/comment');

exports.newComment=(comment)=>{
    console.log('inside node mailer' , comment);

    nodemailer.transpoter.sendMail({
        from:'uvcan.aditya@gmail.com',
        to:Comment.user,
        subject:"New comment Published",
        html:'<h1>New comment published</h1>'
    },(err ,info)=>{
        if(err){console.log('error in sending the email', err);return;}

        console.log('Message send' ,info);
        return;
    })
}