import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
const Book = mongoose.model('book', BookSchema);
var UserBookshelfSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'book', required: true },
    readingStatus: { type: String, default: 'pending', required: true }, // e.g. "reading", "pending", "finished"
    status: { type: String, default: 'active', required: true }, // e.g. "active", "removed"
    tags: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserBookshelfSchema.virtual('book', {
  ref: Book,
  localField: 'bookId',
  foreignField: '_id',
  justOne: true,
});

export { UserBookshelfSchema };
