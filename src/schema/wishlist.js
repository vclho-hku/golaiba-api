import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getWishlist(id: String!): [Book]
  }

  extend type Mutation {
    addWishList(uid: String!, bookId: String!): User!
    removeWishList(uid: String!, bookId: String!): User!
  }
`;
