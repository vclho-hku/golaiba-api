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
      const promotionList = await BookPromotionList.findOneAndUpdate(
        { key },
        { $push: { books: book } },
        { new: true, useFindAndModify: false },
      ).populate({
        path: 'books',
        populate: {
          path: 'authors',
        },
      });
      console.log(promotionList.books[0].authors);
      return promotionList;
    },
  },
};
