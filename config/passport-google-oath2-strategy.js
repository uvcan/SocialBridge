const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


//tell passport to user a new startegy
passport.use(new googleStrategy({
        clientID:"679979982102-bi5pb2777n8hn27srm5ve7aifn3mgffs.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },

    //find a user
    async function authenticateUser(accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value }).exec();
        //   console.log(user.profile);
        //   console.log(accessToken ,refreshToken);
          if (user) {
            // If found, set the user
            return done(null, user);
          } else {
            // If not found, sign in the user
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
            });
      
            return done(null, newUser);
          }
        } catch (err) {
          console.log('Error in finding or creating the user', err);
          return done(err);
        }
      }
    
    
));


module.exports=passport;