// import gql from 'graphql-tag';
const gql = require('graphql-tag')

const typeDefs = gql`
# scalar DateTime
type User {
  id: ID!
  email: String!
  role: String!
  notes: [Note!]
}

type Note {
  id: ID!
  title: String!
  description: String
  isLiked: Boolean!
  difficulty: Int!
  createdAt: String!
  user: User!
}

type Query {
  notes(userId: ID): [Note!]!
  note(id: ID!): Note
  userNotes: [Note!]!
  adminNotes: [Note!]!
}

type Mutation {
  createNote(input: NoteInput!): Note!
  updateNote(id: ID!, input: NoteInput!): Note!
  deleteNote(id: ID!): Boolean!
}

input NoteInput {
  title: String!
  description: String
  isLiked: Boolean
  difficulty: Int
}
`;

exports.module = typeDefs;
