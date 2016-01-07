var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var FACEBOOK_APP_ID = "jhjkh";
var FACEBOOK_APP_SECRET = "hkjhkj";

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://127.0.0.1:8000/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //TODO update user or create if it doesnt exits
      console.log(profile);
      return done(null, profile);
    });
  }
));

module.exports = passport;