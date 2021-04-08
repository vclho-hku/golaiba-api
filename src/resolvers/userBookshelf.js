import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server-errors';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
import { UserBookshelfSchema } from '../models/UserBookshelf.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);
const UserBookshelf = mongoose.model(
  'userBookshelf',
  UserBookshelfSchema,
  'userBookshelf',
);

export default {
  Query: {
    getBookshelf: async (parent, args, { models }) => {
      return [];
    },
    getUserBook: async (parent, { userId, bookId }, { models }) => {
      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      return userBook;
    },
    getUserBookshelf: async (parent, { userId }, { models }) => {
      let userBookshelf = await UserBookshelf.find({
        userId: userId,
        status: 'active',
      }).populate('bookId');
      let result = userBookshelf.map((inputBook) => {
        // inputBook['book'] = inputBook.bookId;
        // delete inputBook.bookId;
        var newBook = {
          book: inputBook.bookId,
          readingStatus: inputBook.readingStatus,
        };
        return newBook;
      });
      return result;
    },
  },
  Mutation: {
    addToBookshelf: async (parent, { userId, bookId }, { models }) => {
      await User.findById(userId);
      await Book.findById(bookId);

      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      if (userBook == null) {
        userBook = await new UserBookshelf({
          userId,
          bookId,
        });
        await userBook.save();
      }
      return userBook;
    },
    removeFromBookshelf: async (parent, { userId, bookId }, { models }) => {
      await User.findById(userId);
      await Book.findById(bookId);

      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      userBook.status = 'removed';
      userBook.save();

      return userBook;
    },
    updateUserBookReadingStatus: async (
      parent,
      { userId, bookId, readingStatus },
      { models },
    ) => {
      await User.findById(userId);
      await Book.findById(bookId);

      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      userBook.readingStatus = readingStatus;
      userBook.save();

      return userBook;
    },
  },
};
