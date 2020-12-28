import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    bookPromotionList(key: String!): [Book!]
    allBookPromotionList: [BookPromotionList!]
  }

  extend type Mutation {
    addPromotionBook(key: String!, bookId: String!): BookPromotionList!
  }

  type BookPromotionList {
    key: ID
    books: [Book]
  }
`;
