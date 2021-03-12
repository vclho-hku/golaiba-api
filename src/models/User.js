import { Schema } from 'mongoose';

var UserSchema = new Schema(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    avatarImgUrl: { type: String },
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
