const express = require('express');

const db = require('./src/config/dbConfig');
// const connection = require('./src/config/dbConfig')
const cors = require('cors')
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 4000;

const noteRoutes = require('./src/route/noteRoute')
const authRoute = require('./src/route/authRoute')

app.use(express.json());

app.use(cors(corsOptions));

app.use('/api/notes', noteRoutes);

app.use('/api/auth', authRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to notes app with postGreSQL." });
})

app.listen(PORT, () => {
    console.log(`Server is currently running on port:${PORT} go to http://localhost:${PORT}`)
})

