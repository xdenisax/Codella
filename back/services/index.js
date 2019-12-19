const User = require("../models/models").User;

const findUserById = async id => {
  let userFound;
  await User.findOne({
    where: {
      id: id
    }
  }).then(user => (userFound = user));
  return userFound;
};

module.exports = { findUserById };
