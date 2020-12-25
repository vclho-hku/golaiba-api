import userResolvers from './user';
import authorResolvers from './author';
import dateResolvers from './date';
import bookPromotionListResolvers from './bookPromotionList';

export default [
  userResolvers,
  bookPromotionListResolvers,
  authorResolvers,
  dateResolvers,
];
