const db = require('../config/dbConfig');


const tableName = 'users'

const createTableQuery = `
create table if not exists ${tableName}(
id serial primarykey,
email varchar,
password varchar,
roles varchar,
created_at timestamp
);
`;

const createUserQuery = `
insert into ${tableName}
(email,password,roles,created_at)
values ($1,$2,$3,$4);
`
const findUserQuery = `select * from ${tableName} where `
const inValidateTokenQuery = ``


const createNewUser = async (newUser) => {

    await db.query(createTableQuery);
    const query = db.query(createUserQuery,
        newUser.email,
        newUser.password,
        newUser
    )
}