import { gql } from 'apollo-server-express';

import userSchema from './user';
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

export default [linkSchema, userSchema, bookPromotionListSchema];
