const express = require('express');
const router = express.Router()
const notesController = require('../controller/noteController');

const { authenticateToken, authorizeRoles, verifyNoteOwnerShip } = require('../middleware/authMiddleware');



// admin and moderator only access routes
router.get('/admin',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.getAllNotes);

router.get('/admin/:id',
    authenticateToken,
    authorizeRoles('admin', 'moderator'),
    notesController.getNoteById);

// access users own notes only
router.get('/user-notes', authenticateToken, notesController.getUserNotes);

router.get('/user-notes/:id', authenticateToken, notesController.getUserNoteByid)

// Protected routes
router.post('/',
    authenticateToken,
    // authorizeRoles('admin', 'moderator'),
    notesController.createNote);

router.put('/user-notes/:id',
    authenticateToken,
    verifyNoteOwnerShip('modify'),
    // async (req, res, next) => {
    //     const note = await findById(req.params.id);
    //     if (note.rows[0].user_id === req.user.userId || req.user.role === 'admin') {
    //         next();
    //     } else {
    //         res.status(403).json({ message: 'Not authorized to modify this note' })
    //     }
    // },
    notesController.updateNoteById

)

router.delete('/user-notes/:id',
    authenticateToken,
    verifyNoteOwnerShip('delete'),
    // async (req, res, next) => {
    //     const note = await findById(req.params.id);
    //     if (note.rows[0].user_id === req.user.userId || req.user.role === 'admin') {
    //         next()
    //     } else {
    //         res.status(403).json({ message: `Not authorized to delete this note. Your role is :${req.user.role} ` });
    //     }
    // },
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


