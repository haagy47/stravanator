const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

    app.use(passport.initialize());
    app.use(passport.session());

    /*const stravaConfig = {
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/users/dashboard"
    }

    const strategy = new StravaStrategy(stravaConfig, (accessToken, refreshToken, profile, done) => {
      const stravaId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      User.find({where: {stravaId}})
        .then(foundUser => (foundUser
          ? done(null, foundUser)
          : User.create({name, email, stravaId})
            .then(createdUser => done(null, createdUser))
        ))
        .catch(done)
    })*/

    // Passport strava auth example

    //var StravaStrategy = require('passport-strava').Strategy;

    passport.use(new StravaStrategy({
        clientID: process.env.STRAVA_CLIENT_ID,
        clientSecret: process.env.STRAVA_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/users/dashboard"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
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
