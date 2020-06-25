import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);

export default {
  Query: {
    users: async (parent, args, { models }) => {
      let users = await User.find();
      return users;
    },
    user: async (parent, { uid }, { models }) => {
      let user = await User.findOne({ uid });
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, { userInfo }, { models }) => {
      let user = await new User(userInfo);
      await user.save();
      return user;
    },
  },
};
