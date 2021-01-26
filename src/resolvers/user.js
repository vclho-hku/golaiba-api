import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);

export default {
  Query: {
    users: async (parent, args, { models }) => {
      let users = await User.find();
      return users;
    },
    user: async (parent, { id }, { models }) => {
      let user = await User.findOne({ id });
      return user;
    },
    userByUID: async (parent, { uid }, { models }) => {
      let user = await User.findOne({ uid });
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, { data }, { models }) => {
      const uid = data.uid;
      let user = await User.findOne({ uid });
      if (!user) {
        user = await new User(data);
        await user.save();
      }
      return user;
    },
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
