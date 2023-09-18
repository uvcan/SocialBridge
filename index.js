const express=require('express');
const port=8000;

const app=express();



//use express router which acs as a middleware
app.use('/',require('./routes'));


//Telling the App to listen on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err} `);
    }
    console.log(`Server in running on port ${port}`);

});


