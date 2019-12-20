/*GET /keywords -> afisare toate cuvintele cheie
GET /keywords/note_id -> afisare toate cuvintele cheie pt o notita
POST /keywords/note_id -> adaugare cuvant cheie la notita*/

const {
  sequelize,
  User,
  UserGroup,
  Group,
  Note,
  Keyword
} = require("../models/models");

//GET /keywords -> afisare toate cuvintele cheie
const getAllKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.findAll();
    res.status(200).send(keywords);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Bad request: server unable to process the request" });
  }
};

//GET /keywords/note_id -> afisare toate cuvintele cheie pt o notita

const getAllKeywordsForANote = async (req, res) => {
  try {
    const note_id = req.params.note_id;
    if (note_id) {
      try {
        const keywords = await Keyword.findAll({
          where: { id: note_id }
        });
        res.status(200).send(keywords);
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

//POST /keywords/note_id -> adaugare cuvant cheie la notita
const addKeywordToNote = async (req, res) => {
  try {
    const note_id = req.params.note_id;
    Note.findOne({ where: { id: note_id } }).then(result => {
      if (result) {
        const keyword = new Keyword(req.body);
        keyword.noteId = note_id;
        keyword.save();
        res.status(201).send({ message: "Keyword added successfully." });
      } else {
        res.status(400).send({ message: "Invalid payload" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getAllKeywords,
  getAllKeywordsForANote,
  addKeywordToNote
};
