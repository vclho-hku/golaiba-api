import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);

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
  },
};
