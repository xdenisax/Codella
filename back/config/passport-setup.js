const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const googleCredentials = require("./keys").googleAuth;
const User = require("../models/models").User;
const { findUserById } = require("../services/index");
passport.serializeUser((user, done) => {
  //null pentru eroare, altfel stocheaza id-ul utilizatorului curent intr-un cookie
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
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    //functie callback pentru autentificarea cu google
    //este apelata atunci cand google primeste cheia de la ruta de callback
    (accessToken, refreshToken, profile, done) => {
      //verifica daca userul exista deja
      User.findOne({
        where: { email: profile.emails[0].value }
      }).then(currentUser => {
        if (currentUser) {
          //userul e deja in baza de date
          done(null, currentUser);
        } else {
          //daca nu, creeaza utilizator
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
