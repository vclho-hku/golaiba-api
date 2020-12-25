import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(data: authorData!): Author!
  }

  type Author {
    name: String
    dateOfBirth: Date
    nationality: String
  }

  input authorData {
    name: String
    dateOfBirth: String
    nationality: String
  }
`;
