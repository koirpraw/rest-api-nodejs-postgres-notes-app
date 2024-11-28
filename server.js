const express = require('express');

const db = require('./src/config/dbConfig');
// const connection = require('./src/config/dbConfig')
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./src/graphql/schema')
const { resolvers } = require('./src/graphql/noteResolvers')
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

app.use('/api', noteRoutes);

app.use('/api', authRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to notes app with postGreSQL." });
})

// // GraphQL Setup
// const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//         // Share authentication logic
//         const token = req.headers.authorization;
//         return { token };
//     }
// });

// // Start Apollo Server and apply middleware
// async function startApolloServer() {
//     await apolloServer.start();

//     // Apply GraphQL middleware to specific path
//     apolloServer.applyMiddleware({
//         app,
//         path: '/graphql'
//     });
// }

// startApolloServer();

// app.listen(PORT, () => {
//     console.log(`REST API running on http://localhost:${PORT}`);
//     console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
// });

app.listen(PORT, () => {
    console.log(`Server is currently running on port:${PORT} go to http://localhost:${PORT}`)
})

