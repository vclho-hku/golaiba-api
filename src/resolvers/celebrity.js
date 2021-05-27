import mongoose from 'mongoose';
import { CelebritySchema } from '../models/Celebrity';
import { BookSchema } from '../models/Book.js';
const Celebrity = mongoose.model('celebrity', CelebritySchema, 'celebrities');
const Book = mongoose.model('book', BookSchema);

export default {
  Query: {
    celebrity: async (parent, { id }, { models }) => {
      let celebrity = await Celebrity.findById(id)
        .populate({
          path: 'recommendBooks',
          populate: {
            path: 'book',
          },
        })
        .populate({
          path: 'recommendBooks.book',
          populate: {
            path: 'authors',
          },
        });
      return celebrity;
    },
    starCelebrityList: async (parent, { id }, { models }) => {
      let celebrityList = await Celebrity.find({
        isStarCelebrity: true,
      })
        .populate({
          path: 'recommendBooks',
          // match: { isKeyRecommend: true },
          populate: {
            path: 'book',
          },
        })
        .populate({
          path: 'recommendBooks.book',
          populate: {
            path: 'authors',
          },
        });

      // let celebrityList = await Celebrity.aggregate()
      //   .match({
      //     isStarCelebrity: true,
      //   })
      //   .unwind('recommendBooks')
      //   .match({
      //     'recommendBooks.isKeyRecommend': true,
      //   })
      //   .group({ _id: '$_id', recommendBooks: { $push: '$recommendBooks' } });

      return celebrityList;
    },
    starPrizeList: async (parent, { id }, { models }) => {
      let prizeList = await Celebrity.find({
        isStarPrize: true,
        isPrize: true,
      })
        .populate({
          path: 'recommendBooks',
          populate: {
            path: 'book',
          },
        })
        .populate({
          path: 'recommendBooks.book',
          populate: {
            path: 'authors',
          },
        });
      return prizeList;
    },
  },
  Mutation: {
    createCelebrity: async (parent, { name, data }, { models }) => {
      let payload = {};
      if (data) {
        payload = data;
      }
      payload.name = name;
      let celebrity = await new Celebrity(payload);
      await celebrity.save();
      return celebrity;
    },
    addCelebrityRecommendBook: async (
      parent,
      { id, bookId, year, description, isKeyRecommend },
      { models },
    ) => {
      let celebrity = await Celebrity.findById(id);
      let book = await Book.findById(bookId);
      let bookDetails = {
        year: year,
        description: description,
        book: book.id,
        isKeyRecommend: isKeyRecommend,
      };
      celebrity.recommendBooks.push(bookDetails);
      await celebrity.save();
      return celebrity;
    },
  },
};
