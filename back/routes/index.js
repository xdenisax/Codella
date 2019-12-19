const express = require("express");
const router = express.Router();
const passport = require("passport");
const authRouter = require("./auth-routes");
const { isUserAuthenticated } = require("../controllers/middlewares");
//routes for auth
router.use("/auth", authRouter);
// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
//dashboard for user
router.get("/dashboard", isUserAuthenticated, (req, res) => {
  res.send("Logged in, Dashboard " + req.user.firstname);
});

module.exports = router;
