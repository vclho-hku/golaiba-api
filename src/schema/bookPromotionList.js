import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    bookPromotionList(key: String!): [Book!]
  }

  extend type Mutation {
    addPromotionBook(key: String!, bookInfo: inputBookData!): Book!
  }

  type Book {
    _id: ID!
    isbn: String!
    title: String!
    author: String!
    publisher: String
    publishYear: String
    bookCoverImgUrl: String
  }

  input inputBookData {
    isbn: String
    title: String
    author: String
    publisher: String
    publishYear: String
    bookCoverImgUrl: String
  }
`;
