const express = require("express");
const router = express.Router();
const passport = require("passport");
const authRouter = require("./auth-routes");
const notesRouter = require("./notes");
const keywordsRouter = require("./keywords");
const groupsRouter = require("./groups");
const userRouter = require("./users");

const { isUserAuthenticated } = require("../controllers/middlewares");
//routes for auth
router.use("/auth", authRouter);
router.use("/", notesRouter);
router.use("/", keywordsRouter);
router.use("/", groupsRouter);
router.use("/", userRouter);
// Logout route
/*router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});*/
//dashboard for user
router.get("/dashboard", isUserAuthenticated, (req, res) => {
  res.send("Logged in, Dashboard for " + req.user.firstname);
});

module.exports = router;
