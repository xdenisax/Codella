const {
  sequelize,
  User,
  UserGroup,
  Group,
  Note,
  Keyword
} = require("./models/models");
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const path = require("path");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const app = express();
const indexRouter = require("./routes/index");

app.use(express.static(path.join(__dirname, "../front")));

//encrypt the cookie and make it a day long
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //a day in milliseconds
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//set up routes
app.use("/", indexRouter);

app.listen(8080, () => {
  console.log("Server started on port 8080...");
});
