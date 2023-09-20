const express=require('express');
const cookiePasser=require('cookie-parser');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//Use for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const { sanitizeFilter } = require('mongoose');



app.use(express.urlencoded());
//Telling the app to use cookies for authentication 
app.use(cookiePasser());


//telling the use the static file from assets folder 
app.use(express.static('./assets'));

//telling the app to use layouts
app.use(expressLayouts);

//Extract styles and scripts for layots for sub pages 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'socilaBridege',
    //ToDo change the secreat before deploying in production mode 
    secret:'blah Somthing ',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


//use express router which acs as a middleware
app.use('/',require('./routes'));

//Telling the App to listen on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err} `);
    }
    console.log(`Server in running on port ${port}`);

});


