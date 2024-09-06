const Note = require('../model/note')


exports.createNote = async (req, res) => {

    try {
        const { title, description } = req.body;
        const date = new Date();
        const createdAtStamp = date.toLocaleString();

        const newNote = {
            title,
            description,
            isLiked: false,
            difficulty: 1,
            created_at: createdAtStamp
        }
        const note = await Note.create(newNote)


        res.status(201).json(note.rows);
    } catch (error) {
        res.status(500).send({ message: 'Error creating note', error: error.message });
        throw (error)

    }
}

exports.getAllNotes = async (req, res) => {

    try {
        const notes = await Note.findAll()
        res.status(200).json(notes.rows);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching notes', error: error.message });
        throw (error)

    }

}

exports.getNoteById = async (req, res) => {

    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        res.status(200).json(note.rows);

    } catch (error) {
        res.status(500).send({ message: 'Error fetching notes', error: error.message });
        throw (error)
    }
}

exports.updateNoteById = async (req, res) => {

    try {
        const id = req.params.id;
        const { title, description, is_liked, difficulty } = req.body;
        const date = new Date();
        const createdAtStamp = date.toLocaleString();
        console.log(createdAtStamp)
        const updatedNote = {
            title,
            description,
            isLiked: is_liked,
            difficulty,
            created_at: createdAtStamp
        }
        const note = await Note.update(updatedNote, id)
        res.status(200).json(note.rows);
        // console.log(note.fields)

    } catch (error) {
        res.status(500).send({ message: 'Error updating notes', error: error.message });
        throw (error)

    }
}

exports.deleteNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.remove(id);
        const notes = await Note.findAll()
        res.status(200).json(notes.rows.map(note => note.title));

    } catch (error) {
        res.status(500).send({ message: 'Error deleting note', error: error.message });
        throw (error)

    }
}

exports.deleteAll = async (req, res) => {
    try {
        const notes = await Note.removeAll();
        res.status(200).send({ message: "All data deleted , the table is now empty" })

    } catch (error) {
        res.status(500).send({ message: 'Error deleting all notes', error: error.message });
        throw (error)

    }
}


// const express = require('express');
// const router = express.Router();
// const notesController = require('../controller/noteController');

// router.post('/', notesController.createNote);

// router.get('/', notesController.getAllNotes);

// router.get('/:id', notesController.getNoteById);

// router.put('/:id', notesController.updateNoteById);

// router.delete('/:id', notesController.deleteNoteById);

// router.delete('/', notesController.deleteAll);



// module.exports = router;