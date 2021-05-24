import userResolvers from './user';
import authorResolvers from './author';
import bookResolvers from './book';
import dateResolvers from './date';
import publisherResolvers from './publisher';
import bookPromotionListResolvers from './bookPromotionList';
import wishListResolvers from './wishlist';
import userBookshelfResolvers from './userBookshelf';
import userBookReviewResolvers from './userBookReview';
import followListResolvers from './followList';
import celebrityResolvers from './celebrity';

export default [
  userResolvers,
  bookPromotionListResolvers,
  authorResolvers,
  dateResolvers,
  bookResolvers,
  publisherResolvers,
  wishListResolvers,
  userBookshelfResolvers,
  userBookReviewResolvers,
  followListResolvers,
  celebrityResolvers,
];
