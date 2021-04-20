import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getFollower(userId: ID!): [User]
    getFollowee(userId: ID!): [User]
  }
  extend type Mutation {
    addFollowee(userId: ID!, followeeId: ID!): User
  }
`;
