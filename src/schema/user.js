import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(uid: ID!): User
  }

  extend type Mutation {
    createUser(data: userData!): User!
  }

  type User {
    _id: ID!
    uid: String!
    name: String!
    email: String!
  }

  input userData {
    uid: String
    name: String
    email: String
  }
`;
