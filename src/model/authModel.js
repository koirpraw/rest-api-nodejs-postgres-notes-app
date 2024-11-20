const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const tableName = 'users';
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createUserQuery = `
    INSERT INTO ${tableName} (email, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role;
`;

const findUserByEmailQuery = `
    SELECT * FROM ${tableName} WHERE email = $1;
`;

const createNewUser = async (userData) => {
    try {
        await db.query(createTableQuery);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const result = await db.query(createUserQuery, [
            userData.email,
            hashedPassword,
            userData.role || 'user'
        ]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const result = await db.query(findUserByEmailQuery, [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// const invalidateToken = async (refreshToken) =>{
//     try {
//         const result = 

//     } catch (error) {
//         console.log('error invalidating token',error)

//     }
// }

module.exports = {
    createNewUser,
    findUserByEmail
};