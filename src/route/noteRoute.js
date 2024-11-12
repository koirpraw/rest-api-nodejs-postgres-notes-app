const express = require('express');
const router = express.Router()
const notesController = require('../controller/noteController');

const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware')

// public routes

router.get('/', authenticateToken, notesController.getAllNotes);
router.get('/:id', authenticateToken, notesController.getNoteById);

// Protected routes

router.post('/',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.createNote);

// router.get('/', notesController.getAllNotes);

// router.get('/:id', notesController.getNoteById);

router.put('/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.updateNoteById);

router.delete('/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.deleteNoteById);

router.delete('/',
    authenticateToken,
    authorizeRoles('admin'),
    notesController.deleteAll);


module.exports = router;


