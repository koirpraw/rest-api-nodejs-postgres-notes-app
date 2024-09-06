require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USERDB,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

const dbConnection = async () => {
    try {
        await pool.connect();
        console.log('Succesfully connected to postgres DB')
    } catch (error) {
        console.error('Error connecting to the database', error.message)
    } finally {
        pool.end();
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    dbConnection
};