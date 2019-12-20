const User = require("../models/models").User;

const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    User.findOne({
      where: {
        id: user_id
      }
    }).then(result => {
      if (result) {
        result.destroy();
        res.status(200).send({
          message: "User deleted"
        });
      } else
        res.status(404).send({
          message: "Could not find user"
        });
    });
  } catch (e) {
    res.status(500).send({ message: "Server error." });
  }
};

module.exports = { deleteUser };
