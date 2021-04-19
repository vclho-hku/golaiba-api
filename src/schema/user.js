import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    userByUID(uid: String!): User
    getUserBySearch(keywords: String!): [User]
  }

  extend type Mutation {
    createUser(data: userData!): User!
  }

  type User {
    id: ID
    _id: ID
    uid: String
    name: String
    email: String
    wishlist: [Book]
  }

  input userData {
    uid: String
    name: String
    email: String
  }
`;
