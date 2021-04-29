import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
import { AddUserActivity } from '../models/UserActivity';
import { UserBookReviewSchema } from '../models/UserBookReview.js';
import { WRITTEN_BOOK_REVIEW } from '../constant/UserActivityList';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);

const UserBookReview = mongoose.model(
  'userBookReview',
  UserBookReviewSchema,
  'userBookReview',
);

export default {
  Query: {
    getUserBookReview: async (parent, { userId, bookId }, { models }) => {
      let userBookReview = await UserBookReview.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      return userBookReview;
    },
    getBookReview: async (parent, { bookId, limit, offset }, { models }) => {
      let reviewlimit = 1;
      let reviewOffset = 0;
      if (limit && limit > 0 && limit < 50) {
        reviewlimit = limit;
      }
      if (offset && offset > 0) {
        reviewOffset = offset;
      }

      let userBookReview = await UserBookReview.find({
        bookId: bookId,
        status: 'active',
      })
        .skip(reviewOffset)
        .limit(reviewlimit);
      return userBookReview;
    },
  },
  Mutation: {
    addUserBookReview: async (
      parent,
      { userId, bookId, rating, review },
      { models },
    ) => {
      const user = await User.findById(userId);
      let book = await Book.findById(bookId);
      let userBookReview = await UserBookReview.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      if (userBookReview == null) {
        userBookReview = await new UserBookReview({
          userId,
          bookId,
          userName: user.name,
          userAvatarImgUrl: user.avatarImgUrl.small,
          rating,
          review,
          status: 'active',
        });
        userBookReview.save();
        let activityData = {
          bookId: book.id,
          bookRating: rating,
          bookReview: review,
        };
        AddUserActivity(user.id, WRITTEN_BOOK_REVIEW, activityData);

        if (rating) {
          let newBookRating =
            (book.rating * book.ratingCount + rating) / (book.ratingCount + 1);
          book.rating = newBookRating.toFixed(2);
          book.ratingCount = book.ratingCount + 1;
          book.save();
        }
      }
      return userBookReview;
    },
  },
};
