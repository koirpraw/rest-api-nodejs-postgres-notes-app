
const db = require('../config/dbConfig');

const tableName = 'notes';
const usersTable = `users`;
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        is_liked BOOLEAN,
        difficulty INTEGER,
        user_id INTEGER REFERENCES ${usersTable}(id),
        created_at TIMESTAMP
        
    );
`

const create = async (newNote, userId) => {
    const insertNoteQuery = `
    INSERT INTO ${tableName} (title, description, is_liked, difficulty,user_id,created_at)
    VALUES ($1, $2, $3, $4, $5,$6);
`;

    try {
        await db.query(createTableQuery);

        const query = await db.query(insertNoteQuery, [
            newNote.title,
            newNote.description,
            newNote.isLiked,
            newNote.difficulty,
            userId,
            newNote.created_at
        ]);
        return query

    } catch (error) {
        console.error('Error creating table', error)

    }
};

const findUserNotes = async (userId) => {
    const findUserNotesQuery = `
SELECT * FROM ${tableName} WHERE user_id = $1;
`;
    try {
        const result = await db.query(findUserNotesQuery, [userId])
        return result;

    } catch (error) {
        console.error('Error fetching user notes', error);
        throw error;
    }
}

const findAdminNotes = async () => {
    const findAdminNotesQuery = `
SELECT * FROM ${tableName} WHERE user_id IN
(SELECT id FROM ${usersTable} WHERE role = 'admin');
`
    try {
        const result = await db.query(findAdminNotesQuery);
        return result;

    } catch (error) {
        console.error('Error fetching user notes', error);
        throw error;

    }
}

const findAll = async () => {
    const findAllNotesQuery = `
    SELECT * FROM ${tableName};
`;

    try {
        const query = await db.query(findAllNotesQuery);
        return query;
    } catch (error) {
        console.error('Error creating table', error)
        throw error;

    }
};

const findById = async (id) => {
    const findNoteByIdQuery = `
SELECT * FROM ${tableName} WHERE id = $1;
`
    try {
        const query = await db.query(findNoteByIdQuery, [id]);
        return query;

    } catch (error) {
        console.error('Error fetching Note by ID', error)
        throw error;

    }
};

const findUserNoteById = async (id, user_id) => {
    const userNoteByIdQuery =
        `
        SELECT * FROM ${tableName} WHERE id =$1 AND user_id = $2;
    `
    try {
        const query = await db.query(userNoteByIdQuery, [id, user_id]);
        return query;

    } catch (error) {
        console.error('Error finding user note by id', error)

    }
}

const update = async (updatedNote, id) => {
    const updateNoteQuery = `
    UPDATE ${tableName}
    SET title = $1, description = $2, is_liked = $3, difficulty = $4, created_at = $5
    WHERE id = $6;
`;
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
    const deleteNoteQuery = `
    DELETE FROM ${tableName} WHERE id = $1;
`;

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
    findAdminNotes,
    findUserNotes,
    create,
    findAll,
    findById,
    update,
    remove,
    removeAll,
    findUserNoteById
};