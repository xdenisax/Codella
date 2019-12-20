// GET /groups/:user_id(ct) -> listeaza toate grupurile pt un utilizator
// GET /groups/:groupId-> listeaza toti utilizatorii dintr-un grup
// POST /groups/:groupId/:user_id-> adauga un utilizator la un grup
// DELETE /groups/:groupId/:user_id -> sterge un utilizator dintr-un grup
// POST /groups -> creare grup
// DELETE /group/:groupId -> stergere grup
// POST /groups/:groupId/:noteId -> adauga (partajeaza) o notita la un grup
// GET /groups/notes/:groupId -> listeaza toate notitele ce apartin de un grup

const Group = require("../models/models").Group;
const UserGroup = require("../models/models").UserGroup;
const User = require("../models/models").User;
const GroupNote = require("../models/models").GroupNote;
const Note = require("../models/models").Note;
//crearea unei grupe
const createGroup = async (req, res) => {
  const group = new Group(req.body);
  if (group.name) {
    await group.save();
    res.status(201).send({
      message: "Group created!"
    });
  } else {
    res.status(400).send({
      message: "Invalid group payload"
    });
  }
};

//stergerea unei grupe
const deleteGroup = async (req, res) => {
  let idGroup = req.params.groupId;

  Group.findOne({
    where: {
      id: idGroup
    }
  }).then(result => {
    if (result) {
      result.destroy();
      res.status(200).send({
        message: "Group deleted!"
      });
    } else
      res.status(404).send({
        message: "Could not find group!"
      });
  });
};

//selectarea tuturor grupelor in care este utilizatorul respectiv
const selectAllGroupsForUser = async (req, res) => {
  let userId = req.params.user_id; //id user
  Group.findAll({
    include: [
      {
        model: UserGroup,
        where: { userId: userId }
      }
    ]
  }).then(result => {
    if (result.length > 0) {
      res.status(200).json(result);
    } else res.status(404).json({ message: "not found" });
  });
};

//selecteaza toti userii unui grup
const selectAllUsersForAGroup = async (req, res) => {
  let group_ID = req.params.groupId;

  User.findAll({
    include: [
      {
        model: UserGroup,
        where: { groupId: group_ID }
      }
    ]
  }).then(result => {
    if (result.length > 0) {
      res.status(200).json(result);
    } else res.status(404).json({ message: "not found" });
  });
};

//POST /groups/:groupId/:user_id-> adauga un utilizator la un grup

const addUserToAGroup = async (req, res) => {
  let group_ID = req.params.groupId;
  let userId = req.params.user_id;

  Group.findOne({ where: { Id: group_ID } }).then(result => {
    if (result) {
      User.findOne({ where: { id: userId } }).then(result => {
        if (result) {
          const ug = new UserGroup();
          ug.userId = userId;
          ug.groupId = group_ID;
          ug.save();
          res.status(201).json({ message: "User added" });
        } else res.status(404).json({ message: "User not found" });
      });
    } else res.status(404).json({ message: "Group not found" });
  });
};

// DELETE /groups/:groupId/:user_id -> sterge un utilizator dintr-un grup

const deleteUserFromAGroup = async (req, res) => {
  let group_ID = req.params.groupId;
  let userId = req.params.user_id;

  UserGroup.findOne({ where: { groupId: group_ID, userId: userId } }).then(
    result => {
      if (result) {
        result.destroy();
        res.status(201).json({ message: "User deleted" });
      } else res.status(404).json({ message: "User Group not found" });
    }
  );
};

//post /groups/:groupId/:noteId Adauga o notita la un grup
const addNoteToGroup = async (req, res) => {
  let group_ID = req.params.groupId;
  let noteId = req.params.noteId;

  Group.findOne({ where: { id: group_ID } }).then(result => {
    if (result) {
      Note.findOne({ where: { id: noteId } }).then(result => {
        if (result) {
          let groupNote = new GroupNote();
          groupNote.groupId = group_ID;
          groupNote.noteId = noteId;
          groupNote.save();
          res
            .status(200)
            .json({ message: `Note ${noteId} added to group ${group_ID}` });
        } else res.status(404).json({ message: "Note not found" });
      });
    } else res.status(404).json({ message: "Group not found" });
  });
};

// get /groups/notes/:groupId Afiseaza toate notitele unei grupe
const getNotesForGroup = async (req, res) => {
  let group_ID = req.params.groupId;

  Note.findAll({
    include: [
      {
        model: GroupNote,
        where: { groupId: group_ID }
      }
    ]
  }).then(result => {
    if (result.length > 0) {
      res.status(200).json(result);
    } else res.status(404).json({ message: "not found" });
  });
};

module.exports = {
  addNoteToGroup,
  getNotesForGroup,
  createGroup,
  deleteGroup,
  selectAllUsersForAGroup,
  selectAllGroupsForUser,
  deleteUserFromAGroup,
  addUserToAGroup
};
