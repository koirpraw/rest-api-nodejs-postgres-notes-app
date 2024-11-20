const express = require('express');
const router = express.Router()
const notesController = require('../controller/noteController');

const { authenticateToken, authorizeRoles, verifyNoteOwnerShip } = require('../middleware/authMiddleware');
const { validateApiKey } = require('../middleware/apiKeyMiddleWare');
// Admin created note for public access.
router.get('/public/notes', validateApiKey, notesController.getAdminNotes)

// router.use(authenticateToken)

// access users own notes only
router.get('/notes', authenticateToken, notesController.getUserNotes);

router.get('/notes/:id', authenticateToken, verifyNoteOwnerShip('view'), notesController.getUserNoteByid)

router.post('/notes', authenticateToken, notesController.createNote);

router.put('/notes/:id', authenticateToken, verifyNoteOwnerShip('modify'), notesController.updateNoteById)

router.delete('/notes/:id', authenticateToken, verifyNoteOwnerShip('delete'), notesController.deleteNoteById);

// admin and moderator only access routes
router.get('/admin/notes',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.getAllNotes);

router.get('/admin/notes/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.getNoteById);



// create route for all admin, moderatpr and user
router.post('/admin/notes',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.createNote);

// update route for all admin, moderator and user
router.put('/admin/notes/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.updateNoteById

)

// update route for all admin, moderator and user
router.delete('/admin/notes/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.deleteNoteById
)

// router.get('/:id', authenticateToken, notesController.getNoteById);

// router.get('/', notesController.getAllNotes);

// router.get('/:id', notesController.getNoteById);

// router.put('/:id',
//     authenticateToken,
//     authorizeRoles('admin', 'moderator'),
//     notesController.updateNoteById);

// router.delete('/:id',
//     authenticateToken,
//     authorizeRoles('admin', 'moderator'),
//     notesController.deleteNoteById);

// router.delete('/',
//     authenticateToken,
//     authorizeRoles('admin'),
//     notesController.deleteAll);

// admin routes
// router.get('/adminNotes',
//     authenticateToken,
//     authorizeRoles('admin', 'moderator'),
//     notesController.getAdminNotes);



module.exports = router;


