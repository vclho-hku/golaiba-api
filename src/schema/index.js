import { gql } from 'apollo-server-express';

import userSchema from './user';
import authorSchema from './author';
import dateSchema from './date';
import bookSchema from './book';
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
  userSchema,
  bookPromotionListSchema,
  authorSchema,
  dateSchema,
  bookSchema,
];
