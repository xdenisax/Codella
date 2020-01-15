// Middleware to check if the user is authenticated
const isUserAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user is not authenticated"
    });
  } else {
    next();
  }
};

module.exports = { isUserAuthenticated };
