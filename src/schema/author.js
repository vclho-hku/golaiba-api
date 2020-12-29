import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(name: multiLang!, data: authorData): Author!
  }

  type Author {
    id: ID
    name: MultiLang
    dateOfBirth: Date
    introduction: String
    nationality: String
  }

  input authorData {
    dateOfBirth: String
    introduction: String
    nationality: String
  }
`;
