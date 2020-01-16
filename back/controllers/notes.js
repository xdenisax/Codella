/*GET /notes -> listare toate notitele pentru un utilizator
GET /notes/:id -> afisare o notita
PUT /notes/:id -> update notita
DELETE /notes/:id -> stergere notita
POST /notes/:id -> adauga o notita*/
const { User, Note } = require("../models/models");

///*GET /notes/:userId -> listare toate notite pentru un utilizator
const getNotesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId) {
      try {
        const notes = await Note.findAll({
          where: { userId: userId }
        });
        res.status(200).send(notes);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res
        .status(400)
        .send({ message: "Bad request: server unable to process the request" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET /notes/:id -> afisare o notita
const getNote = async (req, res) => {
  const note_id = req.params.id;
  try {
    const note = await Note.findOne({ where: { id: note_id } });
    res.status(200).send(note);
  } catch (e) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
  }
};

//PUT /notes/:id -> update notita
const updateNote = async (req, res) => {
  try {
    const note_id = req.params.id;
    Note.findOne({ where: { id: note_id } }).then(result => {
      if (result) {
        result.update({ content: req.body.content });
        res.status(200).send({ message: "Note updated." });
      } else {
        res.status(404).send({ message: "Not found." });
      }
    });
  } catch (e) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
  }
};

//DELETE /notes/:id -> stergere notita
const deleteNote = async (req, res) => {
  const note_id = req.params.id;
  try {
    Note.findOne({
      where: {
        id: note_id
      }
    }).then(result => {
      if (result) {
        result.destroy();
        res.status(200).send({
          message: "Note deleted"
        });
      } else
        res.status(404).send({
          message: "Could not find note"
        });
    });
  } catch (e) {
    res.status(500).send({ message: "Server error." });
  }
};

//POST /notes/:userId -> adauga o notita*/

const saveNote = async (req, res) => {
  const user_id = req.params.userId;
  const note = new Note(req.body);
  note.userId = user_id;
  await note.save();
  res.status(200).send({ id: note.id });
};

module.exports = {
  getNote,
  getNotesForUser,
  updateNote,
  deleteNote,
  saveNote
};
