import { Schema } from 'mongoose';

var FollowListSchema = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    followee: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    status: { type: String, default: 'active', required: true }, // e.g. "active", "removed"
  },
  {
    timestamps: true,
  },
);

export { FollowListSchema };
