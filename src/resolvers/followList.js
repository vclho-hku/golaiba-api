import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
import { FollowListSchema } from '../models/FollowList';
const User = mongoose.model('user', UserSchema);
const FollowList = mongoose.model('followList', FollowListSchema, 'followList');

export default {
  Query: {
    getFollower: async (parent, { userId }, { models }) => {
      let user = await User.findById(userId);
      let followList = await FollowList.find({
        followee: user.id,
        status: 'active',
      })
        .populate('follower')
        .select('follower -_id');
      let followerList = followList.map((data) => {
        return data.follower;
      });
      return followerList;
    },
    getFollowee: async (parent, { userId }, { models }) => {
      let user = await User.findById(userId);
      let followList = await FollowList.find({
        follower: user.id,
        status: 'active',
      })
        .populate('followee')
        .select('followee -_id');
      let followeeList = followList.map((data) => {
        return data.followee;
      });
      return followeeList;
    },
  },
  Mutation: {
    addFollowee: async (parent, { userId, followeeId }, { models }) => {
      let user = await User.findById(userId);
      let followee = await User.findById(followeeId);
      let followList = await FollowList.findOne({
        followee: followee.id,
        follower: user.id,
        status: 'active',
      });
      if (user && followee && followList == null) {
        let followList = await new FollowList({
          followee: followee.id,
          follower: user.id,
          status: 'active',
        });
        followList.save();
      }
      return followee;
    },
  },
};
