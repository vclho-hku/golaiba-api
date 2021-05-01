import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    userByUID(uid: String!): User
    getUserBySearch(userId: ID!, keywords: String!): [User]
  }

  extend type Mutation {
    createUser(data: userData!): User!
    updateUser(data: userData!): User!
  }

  type User {
    id: ID
    _id: ID
    uid: String
    name: String
    email: String
    followerCount: Int
    followeeCount: Int
    bookCount: Int
    wishlist: [Book]
    avatarImgUrl: ImageSize
    isSentNewsletter: Boolean
    language: String
    region: String
    gender: String
    birthDate: Date
    createdAt: Date
  }

  type ImageSize {
    small: String
    medium: String
    large: String
  }

  input userData {
    uid: String
    name: String
    email: String
    isSentNewsletter: Boolean
    language: String
    region: String
    gender: String
    birthDate: Date
  }
`;
