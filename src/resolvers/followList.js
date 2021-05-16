import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
import { FollowListSchema } from '../models/FollowList';
import { UserActivity } from '../models/UserActivity';
import { AddUserActivity } from '../models/UserActivity';
import { ADD_FOLLOWER } from '../constant/UserActivityList.js';
const User = mongoose.model('user', UserSchema);
const FollowList = mongoose.model('followList', FollowListSchema, 'followList');
export default {
  Query: {
    getFollower: async (parent, { userId }, { models }) => {
      let user = await User.findById(userId);
      let followList = await FollowList.find({
        followee: user.id,
        status: 'active',
      }).populate('follower');
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
      }).populate('followee');
      let followeeList = followList.map((data) => {
        return data.followee;
      });

      return followeeList;
    },
    getFolloweeActivity: async (parent, { userId }, { models }) => {
      let user = await User.findById(userId);
      let followList = await FollowList.find({
        follower: user.id,
        status: 'active',
      });

      let followeeIds = [];
      followList.forEach((data) => {
        followeeIds.push(data.followee);
      });
      const followeeActivities = await UserActivity.find({
        userId: {
          $in: followeeIds,
        },
      })
        .populate('user')
        .populate({
          path: 'data',
          populate: {
            path: 'book',
          },
        })
        .populate({
          path: 'data',
          populate: {
            path: 'followee',
          },
        })
        .lean({ virtuals: true })
        .sort({ createdAt: -1 })
        .limit(20);
      return followeeActivities;
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
        user.followeeCount++;
        user.save();
        followee.followerCount++;
        followee.save();
        let activityData = {
          followeeId: followee.id,
        };
        AddUserActivity(user.id, ADD_FOLLOWER, activityData);
      }
      return followee;
    },
    removeFollowee: async (parent, { userId, followeeId }, { models }) => {
      let user = await User.findById(userId);
      let followee = await User.findById(followeeId);
      let followList = await FollowList.findOne({
        followee: followee.id,
        follower: user.id,
        status: 'active',
      });
      if (user && followee && followList) {
        followList.status = 'removed';
        followList.save();
        user.followeeCount--;
        user.save();
        followee.followerCount--;
        followee.save();
      }
      return followee;
    },
  },
};
