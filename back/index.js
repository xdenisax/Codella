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
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());

//encrypt the cookie and make it a day long
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, //a day in milliseconds
    keys: [keys.session.cookieKey]
  })
);

app.use(cookieParser());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//set up routes
app.use("/", indexRouter);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
