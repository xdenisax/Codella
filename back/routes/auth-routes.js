const router = require("express").Router();
const passport = require("passport");

//authenticate w/ google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//callback route for google
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  //res.send(req.user);
  res.redirect("/dashboard");
});

module.exports = router;
