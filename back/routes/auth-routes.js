const router = require("express").Router();
const passport = require("passport");

//autentificare cu google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//callback pentru autentificarea cu google
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  //res.send(req.user);
  res.redirect("/dashboard");
});

module.exports = router;
