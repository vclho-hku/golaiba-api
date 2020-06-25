import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema(
  {
    uid: String,
    name: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

export { UserSchema };
