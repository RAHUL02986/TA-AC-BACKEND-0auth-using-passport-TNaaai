var passport = require('passport');
var githubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(
  new githubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        var profileData = {
          name: profile.displayName,
          username: profile.username,
          email: profile._json.email,
          photo: profile._json.avtar_url,
        };
        var user = await User.findOne({ email: profile._json.email });
        if (!user) {
          var addedUser = await User.create(profileData, addedUser);
          return done(null, addedUser);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    var user = await User.findById(id, 'name email username');
    return done(user);
  } catch (err) {
    return done(err);
  }
});
