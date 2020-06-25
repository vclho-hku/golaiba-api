import mongoose from 'mongoose';
import { BookPromotionListSchema } from '../models/BookPromotionList.js';
import { BookSchema } from '../models/Book.js';
const BookPromotionList = mongoose.model(
  'bookPromotionList',
  BookPromotionListSchema,
  'bookPromotionList',
);
const Book = mongoose.model('book', BookSchema);

export default {
  Query: {
    bookPromotionList: async (parent, { key }, { models }) => {
      return [];
    },
  },
  Mutation: {
    addPromotionBook: async (parent, { key, bookInfo }, { models }) => {
      let book = new Book(bookInfo);
      await BookPromotionList.findOneAndUpdate(
        { key },
        { $push: { books: book } },
      );
      return bookInfo;
    },
  },
};
