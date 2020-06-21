import { gql } from 'apollo-server-express';
 
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(userInfo: inputUserData!): User!
  }
 
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  input inputUserData {
    firstName: String
    lastName: String
    email: String
  }

`;