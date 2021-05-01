import { Schema } from 'mongoose';

var UserSchema = new Schema(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    birthDate: Date,
    gender: String,
    region: { type: String, default: 'hk' },
    language: { type: String, default: 'zh_hk' },
    isSentNewsletter: { type: Boolean, default: false },
    followerCount: { type: Number, default: 0 },
    followeeCount: { type: Number, default: 0 },
    bookCount: { type: Number, default: 0 },
    avatarImgUrl: {
      small: { type: String, default: null },
      medium: { type: String, default: null },
      large: { type: String, default: null },
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export { UserSchema };
