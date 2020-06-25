import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('user', UserSchema);

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return [{ a: 'b' }, { c: 'd' }];
    },
    user: async (parent, { id }, { models }) => {
      let user = await User.findOne({ uid: 'test1' });
      console.log(user);
      return { _id: '888' };
    },
  },
  Mutation: {
    createUser: async (parent, { uid, email, name }, { models }) => {
      // console.log("a")
      // try{
      //   let user = await new User({uid, email, name});
      //   console.log(user)
      //   await user.save();
      // }catch(err){
      //   console.log(err)
      // }
      // console.log(uid)
      // console.log(email)
      // console.log(name)

      return { uid: 'a', name: 'b', email: 'c' };
    },
  },
};
