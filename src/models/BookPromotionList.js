import { Schema } from 'mongoose';

var BookPromotionListSchema = new Schema(
  {
    key: String,
    books: [
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

export { BookPromotionListSchema };
