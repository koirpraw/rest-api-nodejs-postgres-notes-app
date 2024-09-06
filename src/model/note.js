
const db = require('../config/dbConfig');

const tableName = 'notes';
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        is_liked BOOLEAN,
        difficulty INTEGER,
        created_at TIMESTAMP
    );
`;
const insertNoteQuery = `
    INSERT INTO ${tableName} (title, description, is_liked, difficulty, created_at)
    VALUES ($1, $2, $3, $4, $5);
`;

const findAllNotesQuery = `
    SELECT * FROM ${tableName};
`;

const findNoteByIdQuery = `
SELECT * FROM ${tableName} WHERE id = $1;
`
const updateNoteQuery = `
    UPDATE ${tableName}
    SET title = $1, description = $2, is_liked = $3, difficulty = $4, created_at = $5
    WHERE id = $6;
`;

const deleteNoteQuery = `
    DELETE FROM ${tableName} WHERE id = $1;
`;




const create = async (newNote) => {

    try {
        await db.query(createTableQuery);

        const query = await db.query(insertNoteQuery, [
            newNote.title,
            newNote.description,
            newNote.isLiked,
            newNote.difficulty,
            newNote.created_at
        ]);
        return query

    } catch (error) {
        console.error('Error creating table', error)

    }
};

const findAll = async () => {

    try {
        const query = await db.query(findAllNotesQuery);
        return query;
    } catch (error) {
        console.error('Error creating table', error)
        throw error;

    }
};

const findById = async (id) => {
    try {
        const query = await db.query(findNoteByIdQuery, [id]);
        return query;

    } catch (error) {
        console.error('Error fetching Note by ID', error)
        throw error;

    }
};

const update = async (updatedNote, id) => {

    try {
        const query = await db.query(updateNoteQuery, [
            updatedNote.title,
            updatedNote.description,
            updatedNote.isLiked,
            updatedNote.difficulty,
            updatedNote.created_at,
            id
        ])
        return query;

    } catch (error) {
        console.error('Error updating Note', error);
        throw error;

    }
};

const remove = async (id) => {

    try {
        await db.query(deleteNoteQuery, [id]);
    } catch (error) {
        console.error('Error deleting Note', error);
        throw error;

    }
};

const removeAll = async () => {

    try {
        const query = await db.query(`DELETE FROM ${tableName}`);
        return query;

    } catch (error) {
        console.error('Error deleting all Notes', error);
        throw error;

    }
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
    removeAll
};