import mongoose from 'mongoose';

var BookSchema = new mongoose.Schema(
  {
    isbn: String,
    title: String,
    author: String,
    publisher: String,
    publishYear: String,
    bookCoverImgUrl: String,
  },
  {
    timestamps: true,
  },
);

export { BookSchema };
