import { Schema } from 'mongoose';

var UserBookReviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'book', required: true },
    userName: { type: String },
    rating: { type: Number },
    review: { type: String },
    status: { type: String, default: 'active', required: true }, // e.g. "active", "removed"
  },
  {
    timestamps: true,
  },
);

export { UserBookReviewSchema };
