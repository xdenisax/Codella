//deoarece adaugarea in baza de date se face dupa autentificarea prin Google
//singura ruta implementata explicit pentru utilizatori
//este delete
const User = require("../models/models").User;
const router = require("express").Router();
const { deleteUser, createUser, getUser } = require("../controllers/users");

//creare utilizator
router.post("/users", createUser);
//stergere utilizator
router.delete("/users/:id", deleteUser);
//preluare utilizator
router.get("/users/:id", getUser);

module.exports = router;
