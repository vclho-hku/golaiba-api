import { Schema } from 'mongoose';

// isbn: String,
// title: String,
// subtitle: String,
// authors: [person_id],
// translator: [person_id],
// publisher: id,
// publishDate: date,
// imageUrl: String,
// collection: id,

var BookSchema = new Schema(
  {
    isbn: String,
    title: String,
    subtitle: String,
    description: String,
    language: String,
    pageCount: Number,
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
    categories: [String],
  },
  {
    timestamps: true,
  },
);

export { BookSchema };
