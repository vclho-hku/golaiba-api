import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBookshelf(userId: ID!): [Book]
    getUserBook(userId: ID!, bookId: ID!): UserBook
    getUserBookDetails(userBookId: ID!): UserBook
    getUserBookshelf(userId: ID!): [UserBook]
  }

  extend type Mutation {
    addToBookshelf(userId: ID!, bookId: ID!): UserBook
    removeFromBookshelf(userId: ID!, bookId: ID!): UserBook
    addUserBookTag(userId: ID!, bookId: ID!, tag: String): UserBook
    removeUserBookTag(userId: ID!, bookId: ID!, tag: String): UserBook
    updateUserBookReadingStatus(
      userId: ID!
      bookId: ID!
      readingStatus: String
    ): UserBook
  }

  type UserBook {
    id: ID!
    userId: ID
    book: Book
    readingStatus: String
    status: String
    tags: [String]
  }
`;
