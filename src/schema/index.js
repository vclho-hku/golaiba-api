import { gql } from 'apollo-server-express';
import shareSchema from './share';
import userSchema from './user';
import authorSchema from './author';
import dateSchema from './date';
import bookSchema from './book';
import publisherSchema from './publisher';
import bookPromotionListSchema from './bookPromotionList';
import wishListSchema from './wishlist';
import userBookshelfSchema from './userBookshelf';
import userBookReviewSchema from './userBookReview';
import followListSchema from './followList';
import celebritySchema from './celebrity';

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
  shareSchema,
  userSchema,
  bookPromotionListSchema,
  authorSchema,
  dateSchema,
  bookSchema,
  publisherSchema,
  wishListSchema,
  userBookshelfSchema,
  userBookReviewSchema,
  followListSchema,
  celebritySchema,
];
