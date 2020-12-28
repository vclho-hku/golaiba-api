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
      let newPublishList = await BookPromotionList.findOne({
        key,
      });
      return newPublishList;
    },
    allBookPromotionList: async (parent, {}, { models }) => {
      let allPromotionList = await BookPromotionList.find();
      return allPromotionList;
    },
  },
  Mutation: {
    addPromotionBook: async (parent, { key, bookId }, { models }) => {
      const book = await Book.findById(bookId);
      let promotionList = await BookPromotionList.findOne({ key });
      if (promotionList.books.indexOf(bookId) === -1) {
        promotionList.books.push(book);
        await promotionList.save();
      }

      let test = await BookPromotionList.findOne({ key }).populate({
        path: 'books',
        populate: {
          path: 'authors',
        },
      });
      console.log(test.books);
      return test;
    },
  },
};
