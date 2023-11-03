const nodemailer=require('nodemailer');
const passport = require('passport');
const ejs=require('ejs');
const path=require('path');
let transpoter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'socialbridge1010',
        passport:'NodeJsDevelopment'
    }
});



let renderTemplate=(data ,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../view/mailers',relativePath),
        data,
        function(err ,template){
            if(err){console.log('error in sending the mail');return;}
            mailHTML=template;
        }
    )

    return mailHTML;
}



module.exports={
    transpoter:transpoter,
    renderTemplate:renderTemplate
}