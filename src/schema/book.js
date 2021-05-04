import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    books: [Book!]
    book(id: ID!): Book
    getBookBySearch(keywords: String): [Book]
  }

  extend type Mutation {
    createBook(
      data: bookData!
      imageUrl: imageUrl
      authorId: String
      publisherId: String
    ): Book!
  }

  type Book {
    id: ID
    _id: ID
    isbn: String
    title: String
    subtitle: String
    description: String
    language: String
    pageCount: Int
    rating: Float
    ratingCount: Int
    publishDate: Date
    imageUrl: ImageUrl
    authors: [Author]
    publisher: Publisher
    tags: [String]
  }

  input bookData {
    isbn: String
    title: String
    subtitle: String
    description: String
    language: String
    pageCount: Int
    publishDate: Date
  }
`;
