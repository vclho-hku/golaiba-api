import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server-errors';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
import { AddUserActivity } from '../models/UserActivity';
import { UserBookshelfSchema } from '../models/UserBookshelf.js';
import { ADD_TO_BOOKSHELF } from '../constant/UserActivityList';
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
    getUserBookDetails: async (parent, { userBookId }, { models }) => {
      let userBookDetails = await UserBookshelf.findById(userBookId)
        .populate('book')
        .populate({
          path: 'book',
          populate: {
            path: 'authors',
          },
        })
        .populate({
          path: 'book',
          populate: {
            path: 'publisher',
          },
        });
      return userBookDetails;
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
          id: inputBook.id,
          book: inputBook.bookId,
          readingStatus: inputBook.readingStatus,
          tags: inputBook.tags,
        };
        return newBook;
      });
      return result;
    },
  },
  Mutation: {
    addToBookshelf: async (parent, { userId, bookId }, { models }) => {
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);

      let userBook = await UserBookshelf.findOne({
        userId: user.id,
        bookId: book.id,
        status: 'active',
      });
      if (userBook == null) {
        userBook = await new UserBookshelf({
          userId: user.id,
          bookId: book.id,
        });
        await userBook.save();
        user.bookCount++;
        user.save();
        let data = { bookId: book.id };
        AddUserActivity(user.id, ADD_TO_BOOKSHELF, data);
      }
      return userBook;
    },
    addUserBookTag: async (parent, { userId, bookId, tag }, { models }) => {
      await User.findById(userId);
      await Book.findById(bookId);
      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      if (userBook) {
        userBook.tags.push(tag);
        userBook.save();
      }
      return userBook;
    },
    removeUserBookTag: async (parent, { userId, bookId, tag }, { models }) => {
      await User.findById(userId);
      await Book.findById(bookId);
      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      if (userBook) {
        userBook.tags = userBook.tags.filter((tagItem) => tagItem !== tag);
        userBook.save();
      }
      return userBook;
    },

    removeFromBookshelf: async (parent, { userId, bookId }, { models }) => {
      let user = await User.findById(userId);
      await Book.findById(bookId);

      let userBook = await UserBookshelf.findOne({
        userId: userId,
        bookId: bookId,
        status: 'active',
      });
      userBook.status = 'removed';
      userBook.save();
      user.bookCount--;
      user.save();
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
