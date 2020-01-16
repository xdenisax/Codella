const User = require("../models/models").User;

//GET user by id
const getUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findOne({ where: { id: user_id } });
    res.status(200).send(user);
  } catch (e) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
  }
};

//get an id of an user by its email
const getUserIdByEmail = async (req, res) => {
  const user_email = req.params.email;
  try {
    const user = await User.findOne({ where: { email: user_email } });
    res.status(200).send(user);
  } catch (e) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
  }
};

//stergerea unui utilizator
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

//crearea unui utilizator
const createUser = async (req, res) => {
  const user = new User(req.body);
  if (user.email) {
    await user.save();
    res.status(201).send({
      message: "User created!"
    });
  } else {
    res.status(400).send({
      message: "Invalid user payload"
    });
  }
};

module.exports = { deleteUser, createUser, getUser, getUserIdByEmail };
