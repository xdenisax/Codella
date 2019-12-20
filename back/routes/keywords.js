const express = require("express");
const router = express.Router();
const {
  getAllKeywords,
  getAllKeywordsForANote,
  addKeywordToNote
} = require("./../controllers/keywords");

router.post("/keywords/:note_id", addKeywordToNote);
router.get("/keywords", getAllKeywords);
router.get("/keywords/:note_id", getAllKeywordsForANote);

module.exports = router;
