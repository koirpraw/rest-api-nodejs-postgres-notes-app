const db = require('../config/dbConfig');

class Note {

    static tableName = 'notes';
    static date = new Date();
    static createdAtStamp = Note.date.toLocaleString()

    constructor(note) {
        this.title = note.title;
        this.description = note.description;
        this.isLiked = note.isLiked;
        this.difficulty = note.difficulty;
        this.createdAt = note.createdAt;

    }


    static create(newNote) {
        return db.query(`INSERT INTO ${this.tableName} (title, description, is_liked,difficulty,created_at) VALUES ($1,$2,$3,$4,$5)`,
            [newNote.title, newNote.description, newNote.isLiked, newNote.difficulty, newNote.createdAt]);
    }

    static findAll() {
        return db.query(`SELECT * FROM  ${this.tableName}`);
    }
    static findById(id) {
        return db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id])
    }

    static update(updatedNote, id) {
        return db.query(`UPDATE ${this.tableName}
        SET title = $1, description = $2, is_liked = $3,difficulty = $4, created_at = $5
        WHERE ID = $6`, [updatedNote.title, updatedNote.description, updatedNote.isLiked, updatedNote.difficulty, updatedNote.createdAt, id])

    }

    static delete(id) {
        return db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id])

    }

    static deleteAll() {
        return db.query(`DELETE FROM ${this.tableName}`)

    }
}

module.exports = Note;