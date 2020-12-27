import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    books: [Book!]
    book(id: ID!): Book
  }

  extend type Mutation {
    createBook(data: bookData!): Book!
  }

  type Book {
    _id: ID
    isbn: String
    title: String
    subtitle: String
    authors: [Author]
  }

  input bookData {
    isbn: String
    title: String
    subtitle: String
  }
`;
