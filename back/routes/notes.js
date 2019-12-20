const router = require("express").Router();
const Note = require("../models/models").Note;

const {
  getNote,
  getNotes,
  updateNote,
  deleteNote,
  saveNote
} = require("./../controllers/notes");

router.get("/notes", getNotes);
router.get("/notes/:id", getNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.post("/notes/:id", saveNote);

module.exports = router;
