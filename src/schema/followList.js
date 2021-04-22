import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getFollower(userId: ID!): [User]
    getFollowee(userId: ID!): [User]
    getFolloweeActivity(userId: ID!): [UserActivity]
  }
  extend type Mutation {
    addFollowee(userId: ID!, followeeId: ID!): User
  }

  type UserActivity {
    user: User
    activity: String
    data: UserActivityContent
  }

  type UserActivityContent {
    book: Book
    followee: ID
    review: String
    rating: Int
  }
`;
