const express = require('express');
const router = express.Router()
const notesController = require('../controller/noteController');

router.post('/', notesController.createNote);

router.get('/', notesController.getAllNotes);

router.get('/:id', notesController.getNoteById);

router.put('/:id', notesController.updateNoteById);

router.delete('/:id', notesController.deleteNoteById);

router.delete('/', notesController.deleteAll);


module.exports = router;


