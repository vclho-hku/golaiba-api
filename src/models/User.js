import { Schema } from 'mongoose';

var UserSchema = new Schema(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatarImgUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export { UserSchema };
