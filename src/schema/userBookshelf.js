import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBookshelf(userId: String!): [Book]
  }

  extend type Mutation {
    addToBookshelf(userId: String!, bookId: String!): userBook!
  }

  type userBook {
    id: ID!
    userId: ID
    bookId: ID
    readingStatus: String
    status: String
  }
`;
