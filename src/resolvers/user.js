import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);
import elasticClient from '../elasticsearch-client';

export default {
  Query: {
    users: async (parent, args, { models }) => {
      let users = await User.find();
      return users;
    },
    user: async (parent, { id }, { models }) => {
      let user = await User.findById(id);
      return user;
    },
    userByUID: async (parent, { uid }, { models }) => {
      let user = await User.findOne({ uid }).populate('wishlist');
      return user;
    },
    getUserBySearch: async (parent, { userId, keywords }, { models }) => {
      let searchResult = await elasticClient.search({
        index: 'users',
        body: {
          query: {
            bool: {
              should: [
                { match: { 'user.email': keywords } },
                { match: { 'user.name': keywords } },
              ],
            },
          },
        },
      });

      let result = [];
      if (searchResult.body.hits.hits) {
        result = searchResult.body.hits.hits.map((obj) => {
          return obj._source.user;
        });
        result = result.filter((user) => {
          return user._id != userId;
        });
      }
      return result;
    },
  },
  Mutation: {
    createUser: async (parent, { data }, { models }) => {
      const uid = data.uid;
      let user = await User.findOne({ uid }).populate('wishlist');
      if (!user) {
        user = await new User(data);
        await user.save();
        user = await User.findOne({ uid }).populate('wishlist');
      }
      return user;
    },
    updateUser: async (parent, { data }, { models }) => {
      const uid = data.uid;
      let user = await User.findOne({ uid });
      user.name = data.name;
      user.gender = data.gender;
      user.birthDate = data.birthDate;
      user.region = data.region;
      user.language = data.language;
      user.isSentNewsletter = data.isSentNewsletter;
      user.save();
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
