const router = require("express").Router();
const Note = require("../models/models").Note;

const {
  getNote,
  getNotesForUser,
  updateNote,
  deleteNote,
  saveNote
} = require("./../controllers/notes");

router.get("/notes/users/:userId", getNotesForUser);
router.get("/notes/:id", getNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.post("/notes/:userId", saveNote);

module.exports = router;
