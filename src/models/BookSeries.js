import { Schema } from 'mongoose';

var BookSeriesSchema = new Schema(
  {
    name: String,
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

export { BookSeriesSchema };
