import mongoose from 'mongoose';
import { BookSchema } from './Book';

var BookPromotionListSchema = new mongoose.Schema(
  {
    key: String,
    books: [BookSchema],
  },
  {
    timestamps: true,
  },
);

export { BookPromotionListSchema };
