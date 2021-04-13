import { Schema } from 'mongoose';

var BookSchema = new Schema(
  {
    isbn: String,
    title: String,
    subtitle: String,
    description: String,
    language: String,
    pageCount: Number,
    publishDate: Date,
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    imageUrl: {
      small: String,
      medium: String,
      large: String,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'publisher',
    },
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'author',
      },
    ],
    translators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'author',
      },
    ],
    series: {
      type: Schema.Types.ObjectId,
      ref: 'book-series',
    },
    categories: [String],
  },
  {
    timestamps: true,
  },
);

export { BookSchema };
