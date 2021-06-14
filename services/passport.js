const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record
            // for this Profile ID      
            done(null, existingUser);
          } else {
            // We need to create a new User record
            new User({ googleID: profile.id })
              .save()
              .then(user => {
                // If the record was saved, notify passport that it's done
                done(null, user);
              });
          }
        });
    }
  )
);
