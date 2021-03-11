import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);

export default {
  Query: {
    getWishlist: async (parent, { id }, { models }) => {
      let user = await User.findById(id)
        .populate({
          path: 'wishlist',
          populate: {
            path: 'authors',
          },
        })
        .populate({
          path: 'wishlist',
          populate: {
            path: 'publisher',
          },
        });
      return user.wishlist;
    },
  },
  Mutation: {
    addWishList: async (parent, { uid, bookId }, { models }) => {
      let user = await User.findOne({ uid });
      let found = user.wishlist.indexOf(bookId);
      if (found === -1) {
        let book = await Book.findById(bookId);
        user.wishlist.push(book);
        user.save();
      }
      return user;
    },
    removeWishList: async (parent, { uid, bookId }, { models }) => {
      let user = await User.findOne({ uid });
      let index = user.wishlist.indexOf(bookId);
      if (index !== -1) {
        user.wishlist.splice(index, 1);
        user.save();
      }
      return user;
    },
  },
};
