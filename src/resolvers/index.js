import userResolvers from './user';
import authorResolvers from './author';
import bookResolvers from './book';
import dateResolvers from './date';
import publisherResolvers from './publisher';
import bookPromotionListResolvers from './bookPromotionList';
import wishListResolvers from './wishlist';

export default [
  userResolvers,
  bookPromotionListResolvers,
  authorResolvers,
  dateResolvers,
  bookResolvers,
  publisherResolvers,
  wishListResolvers,
];
