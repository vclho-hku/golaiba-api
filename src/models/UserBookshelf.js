import { Schema } from 'mongoose';

var UserBookshelfSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId, required: true },
    readingStatus: { type: String, default: 'pending', required: true }, // e.g. "reading", "pending", "finished"
    status: { type: String, default: 'active', required: true }, // e.g. "active", "removed"
  },
  {
    timestamps: true,
  },
);

export { UserBookshelfSchema };
