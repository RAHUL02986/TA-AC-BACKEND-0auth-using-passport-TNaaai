var passport = require('passport');
var User = require('../models/User');
var githubStrategy = require('passport-github').Strategy;
var googleStrategy = require('passport-google-oauth20').Strategy;

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
          done(null, addedUser);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        var profileData = {
          name: profile._json.given_name,
          username: profile._json.name,
          email: profile._json.email,
          photo: profile._json.picture,
        };
        var user = await User.findOne({ email: profile._json.email });
        if (!user) {
          var addedUser = await User.create(profileData, addedUser);
          done(null, addedUser);
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
