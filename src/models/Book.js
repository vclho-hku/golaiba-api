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
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Author',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export { BookSchema };
