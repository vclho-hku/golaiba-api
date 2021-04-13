import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserBookReveiw(userId: ID!, bookId: ID!): UserBookReview
  }

  extend type Mutation {
    addUserBookReview(
      userId: ID!
      bookId: ID!
      userName: String
      rating: Int
      review: String
    ): UserBookReview
  }

  type UserBookReview {
    id: ID
    userId: ID
    bookId: ID
    userName: String
    rating: Int
    review: String
  }
`;
