const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const StravaStrategy = require('passport-strava').Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

    app.use(passport.initialize());
    app.use(passport.session());

    // Passport strava auth example

    //var StravaStrategy = require('passport-strava').Strategy;

    passport.use(new StravaStrategy({
        clientID: process.env.StravaClientID,
        clientSecret: process.env.StravaClientSecret,
        callbackURL: "http://localhost:3000/users/dashboard"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ stravaId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

    /*passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      User.findOne({
        where: { email }
      })
      .then((user) => {

        if (!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      })
    }));
    */

    passport.serializeUser((user, cb) => {
      cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
      cb(null, obj);
    });
  }
}
