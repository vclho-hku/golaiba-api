import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
import { UserBookReviewSchema } from '../models/UserBookReview.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);
const UserBookReview = mongoose.model(
  'userBookReview',
  UserBookReviewSchema,
  'userBookReview',
);

export default {
  Query: {
    getUserBookReveiw: async (parent, { userId, bookId }, { models }) => {
      let userBookReview = await UserBookReview.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      return userBookReview;
    },
  },
  Mutation: {
    addUserBookReview: async (
      parent,
      { userId, bookId, rating, review },
      { models },
    ) => {
      await User.findById(userId);
      await Book.findById(bookId);

      let userBookReview = await new UserBookReview({
        userId,
        bookId,
        rating,
        review,
        status: 'active',
      });
      userBookReview.save();
      return userBookReview;
    },
  },
};
