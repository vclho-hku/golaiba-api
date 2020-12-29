import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    publisher(id: ID!): Publisher
  }

  extend type Mutation {
    createPublisher(name: multiLang!, data: publisherData): Publisher!
  }

  type Publisher {
    id: ID
    name: MultiLang
    foundedDate: Date
    introduction: String
    officialWebsite: String
  }

  input publisherData {
    foundedDate: String
    introduction: String
    officialWebsite: String
  }
`;
