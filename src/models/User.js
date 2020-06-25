import mongoose from 'mongoose';

var UserBookSchema = new mongoose.Schema(
  {
    isbn: String,
    title: String,
    author: String,
    publisher: String,
    publishYear: String,
    review: String,
    bookCoverImgUrl: String,
  },
  {
    timestamps: true,
  },
);

var BookshelfSchema = new mongoose.Schema(
  {
    userBooks: [UserBookSchema],
  },
  {
    timestamps: true,
  },
);

var UserSchema = new mongoose.Schema(
  {
    uid: String,
    name: String,
    email: String,
    bookshelf: BookshelfSchema,
    friends: [String],
  },
  {
    timestamps: true,
  },
);

export { UserSchema, UserBookSchema, BookshelfSchema };
// module.exports.userSchema = UserSchema;
// module.exports.userBookSchema = UserBookSchema;
// module.exports.bookshelfSchema = BookshelfSchema;
