// GET /groups/:user_id(ct) -> listeaza toate grupurile pt un utilizator //done
// GET /groups/:groupId-> listeaza toti utilizatorii dintr-un grup //done
// POST /groups/:groupId/:user_id-> adauga un utilizator la un grup //done
// DELETE /groups/:groupId/:user_id -> sterge un utilizator dintr-un grup
// POST /groups -> creare grup    //facut
// DELETE /group/:groupId -> stergere grup //facut

const express = require("express");
const router = express.Router();

const {
  addNoteToGroup,
  getNotesForGroup,
  createGroup,
  deleteGroup,
  selectAllUsersForAGroup,
  selectAllGroupsForUser,
  deleteUserFromAGroup,
  addUserToAGroup
} = require("../controllers/groups");

router.get("/groups/notes/:groupId", getNotesForGroup);
router.post("/groups/notes/:groupId/:noteId", addNoteToGroup);
router.get("/groups/:user_id", selectAllGroupsForUser);
router.get("/group/:groupId", selectAllUsersForAGroup);
router.post("/groups/:groupId/:user_id", addUserToAGroup);
router.delete("/groups/:groupId/:user_id", deleteUserFromAGroup);
router.post("/groups", createGroup);
router.delete("/groups/:groupId", deleteGroup);

module.exports = router;
