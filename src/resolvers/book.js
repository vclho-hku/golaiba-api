import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
const Book = mongoose.model('book', BookSchema);
import { AuthorSchema } from '../models/Author.js';
const Author = mongoose.model('author', AuthorSchema);

export default {
  Query: {
    books: async (parent, args, { models }) => {
      let books = await Book.find();
      return books;
    },
    book: async (parent, { id }, { models }) => {
      let book = await Book.findById(id)
        .populate('authors')
        .populate('publisher');
      return book;
    },
  },
  Mutation: {
    createBook: async (parent, { data }, { models }) => {
      let book = await new Book(data);
      const author = await Author.findById('5fe621ab4c6f3c39a9a65857');
      await book.authors.push(author);
      await book.save();
      return book;
    },
  },
};
