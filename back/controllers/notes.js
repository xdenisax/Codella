/*GET /notes -> listare toate notite
GET /notes/:id -> afisare o notita
PUT /notes/:id -> update notita
DELETE /notes/:id -> stergere notita
POST /notes/:id -> adauga o notita*/
const { User, Note } = require("../models/models");

///*GET /notes -> listare toate notite
const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).send(notes);
  } catch (e) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
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
    Note.findOne({ where: { id: req.params.id } }).then(result => {
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

//POST /notes/:id -> adauga o notita*/

const saveNote = async (req, res) => {
  try {
    const user_id = req.params.id;
    User.findOne({ where: { id: req.params.id } }).then(result => {
      if (result) {
        const note = new Note(req.body);
        note.userId = user_id;
        note.save();
        res.status(200).send("Note created");
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

module.exports = {
  getNote,
  getNotes,
  updateNote,
  deleteNote,
  saveNote
};
