import { gql } from 'apollo-server-express';
import multiLangSchema from './multiLang';
import userSchema from './user';
import authorSchema from './author';
import dateSchema from './date';
import bookSchema from './book';
import publisherSchema from './publisher';
import bookPromotionListSchema from './bookPromotionList';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  multiLangSchema,
  userSchema,
  bookPromotionListSchema,
  authorSchema,
  dateSchema,
  bookSchema,
  publisherSchema,
];
