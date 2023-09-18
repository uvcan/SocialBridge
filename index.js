const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');


//telling the use the static file from assets folder 
app.use(express.static('./assets'));

//telling the app to use layouts
app.use(expressLayouts);

//Extract styles and scripts for layots for sub pages 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//use express router which acs as a middleware
app.use('/',require('./routes'));


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


//Telling the App to listen on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err} `);
    }
    console.log(`Server in running on port ${port}`);

});


