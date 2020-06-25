import mongoose from 'mongoose';
import { BookPromotionListSchema } from '../models/BookPromotionList.js';
const BookPromotionList = mongoose.model(
  'bookPromotionList',
  BookPromotionListSchema,
  'bookPromotionList',
);

export default {
  Query: {
    bookPromotionList: async (parent, { key }, { models }) => {
      return [];
    },
  },
  Mutation: {
    addPromotionBook: async (parent, { key, bookInfo }, { models }) => {
      await BookPromotionList.findOneAndUpdate(
        { key },
        { $push: { books: bookInfo } },
      );
      return bookInfo;
    },
  },
};
