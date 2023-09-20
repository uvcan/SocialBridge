const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');


passport.use(new LocalStrategy({
  usernameField: 'email'
}, async function (email, password, done) {
  try {
      // find a user and establish the identity
      const user = await User.findOne({ email: email });

      if (!user || user.password !== password) {
          console.log('Invalid Username/Password');
          return done(null, false);
      }

      return done(null, user);
  } catch (err) {
      console.log('Error in finding user --> Passport', err);
      return done(err);
  }
}));



passport.serializeUser(function(user ,done){
    done(null,user.id);
});


passport.deserializeUser(async function (id, done) {
  try {
      const user = await User.findById(id);

      if (!user) {
          console.log('User not found');
          return done(null, false);
      }

      return done(null, user);
  } catch (err) {
      console.log('Error in finding the user --> Passport', err);
      return done(err);
  }
});



module.exports=passport;