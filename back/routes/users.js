//deoarece adaugarea in baza de date se face dupa autentificarea prin Google
//singura ruta implementata explicit pentru utilizatori
//este delete
const User = require("../models/models").User;
const router = require("express").Router();
const { deleteUser } = require("../controllers/users");

router.delete("/users/:id", deleteUser);

module.exports = router;
