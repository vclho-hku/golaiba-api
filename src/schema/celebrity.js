import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    celebrity(id: ID!): Celebrity
  }

  extend type Mutation {
    createCelebrity(name: multiLang!, data: celebrityData): Celebrity!
    addCelebrityRecommendBook(
      id: ID!
      bookId: ID!
      year: String
      description: String
      isKeyRecommend: Boolean
    ): Celebrity!
  }

  type Celebrity {
    id: ID
    name: MultiLang
    isStarCelebrity: Boolean
    isPrize: Boolean
    suggestBooks: [CelebrityRecommendBook]
  }

  type CelebrityRecommendBook {
    year: String
    description: String
    isKeyRecommend: Boolean
    book: Book
  }

  input celebrityData {
    isStarCelebrity: Boolean
    isPrize: Boolean
  }
`;
