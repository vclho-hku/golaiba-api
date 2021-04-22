import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
import { BookSchema } from '../models/Book.js';
const User = mongoose.model('user', UserSchema);
const Book = mongoose.model('book', BookSchema);
const UserActivitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    activity: { type: String, required: true },
    data: {
      bookId: { type: Schema.Types.ObjectId, ref: 'book' },
    },
  },
  {
    timestamps: true,
  },
);

const UserActivity = mongoose.model(
  'userActivity',
  UserActivitySchema,
  'userActivity',
);

UserActivitySchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

UserActivitySchema.virtual('data.book', {
  ref: Book,
  localField: 'data.bookId',
  foreignField: '_id',
  justOne: true,
});

const AddUserActivity = (userId, activity, data) => {
  let userActivity = new UserActivity({
    userId,
    activity,
    data,
  });
  userActivity.save();
};

export { UserActivitySchema, AddUserActivity, UserActivity };
