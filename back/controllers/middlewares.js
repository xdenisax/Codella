// Middleware to check if the user is authenticated
const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    //res.redirect("/auth/login");
    res.send("You must login!");
  }
};

module.exports = { isUserAuthenticated };
