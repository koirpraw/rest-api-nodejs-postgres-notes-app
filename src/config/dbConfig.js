require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USERDB,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};