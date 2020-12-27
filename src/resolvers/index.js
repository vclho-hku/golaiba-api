import userResolvers from './user';
import authorResolvers from './author';
import bookResolvers from './book';
import dateResolvers from './date';
import bookPromotionListResolvers from './bookPromotionList';

export default [
  userResolvers,
  bookPromotionListResolvers,
  authorResolvers,
  dateResolvers,
  bookResolvers,
];
