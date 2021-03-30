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
      let userBookshelf = await UserBookshelf.findOne({
        userId: userId,
        status: 'active',
      }).populate('bookId');
      console.log(userBookshelf);
      return [];
    },
  },
  Mutation: {
    addToBookshelf: async (parent, { userId, bookId }, { models }) => {
      let user = await User.findById(userId);
      let book = await Book.findById(bookId);

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
  },
};
