import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(name: multiLang!, data: authorData): Author!
  }

  type Author {
    name: MultiLang
    dateOfBirth: Date
    nationality: String
  }

  type MultiLang {
    en: String
    zh_hk: String
  }

  input multiLang {
    en: String
    zh_hk: String
  }

  input authorData {
    dateOfBirth: String
    nationality: String
  }
`;
