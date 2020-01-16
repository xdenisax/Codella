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
const authCheck = require("./controllers/middlewares").isUserAuthenticated;
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "DELETE,PUT");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//set up routes
app.use("/", indexRouter);

//verificare daca utilizatorul e logat
app.get("/dashboard", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true
  })
);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
