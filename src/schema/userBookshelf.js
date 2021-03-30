import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBookshelf(userId: ID!): [Book]
    getUserBook(userId: ID!, bookId: ID!): UserBook
    getUserBookshelf(userId: ID!): [UserBook]
  }

  extend type Mutation {
    addToBookshelf(userId: ID!, bookId: ID!): UserBook
  }

  type UserBook {
    id: ID!
    userId: ID
    book: [Book]
    readingStatus: String
    status: String
  }
`;
