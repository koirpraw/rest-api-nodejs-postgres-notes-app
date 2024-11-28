const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const path = require('path');
const context = require('./context');
const resolvers = require('./resolvers/noteResolvers');

const typeDefs = readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

module.exports = server;