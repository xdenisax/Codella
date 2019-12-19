const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const googleCredentials = require("./keys").googleAuth;
const User = require("../models/models").User;
const { findUserById } = require("../services/index");
passport.serializeUser((user, done) => {
  //null for error, else stores the id into a cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findUserById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCredentials.clientID,
      clientSecret: googleCredentials.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    //callback function for google auth
    //fires when google receives the key from the callback route
    (accessToken, refreshToken, profile, done) => {
      //checks if the user already exists
      User.findOne({
        where: { email: profile.emails[0].value }
      }).then(currentUser => {
        if (currentUser) {
          //user already in db
          done(null, currentUser);
        } else {
          //create user
          let user = new User({
            familyname: profile.name.familyName,
            firstname: profile.name.givenName,
            email: profile.emails[0].value
          });
          user.save().then(newUser => {
            done(null, newUser);
          });
        }
      });
    }
  )
);
