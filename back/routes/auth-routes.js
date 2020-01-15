const router = require("express").Router();
const passport = require("passport");
const Dashboard_URL = "http://localhost:3000/dashboard";
const Homepage_URL = "http://localhost:3000/";
const cors = require("cors");
// cand userul se logheaza cu succes, se preiau datele despre el
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.status(401).json({
      message: "auth failed"
    });
  }
});

// cand loginul nu reuseste se trimite mesaj
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "auth failed"
  });
});

// la logout, redirect la homepage
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(Homepage_URL);
});

//autentificare cu google
router.get("/google", passport.authenticate("google"));

//callback pentru autentificarea cu google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: Dashboard_URL,
    failureRedirect: "auth/login/failed"
  })
);

module.exports = router;
