const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);
router.get("/notes", notes.createNote);
router.post("/notes", notes.createNote);
router.get("/notes/:id/", notes.showNotes);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;