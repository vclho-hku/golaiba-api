import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
const Book = mongoose.model('book', BookSchema);
import { AuthorSchema } from '../models/Author.js';
const Author = mongoose.model('author', AuthorSchema);
import { PublisherSchema } from '../models/Publisher.js';
const Publisher = mongoose.model('publisher', PublisherSchema);
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
    createBook: async (
      parent,
      { data, imageUrl, authorId, publisherId },
      { models },
    ) => {
      let payload = data;
      payload.imageUrl = imageUrl;
      let book = await new Book(payload);
      const author = await Author.findById(authorId);
      if (author) {
        book.authors.push(author);
      }
      const publisher = await Publisher.findById(publisherId);
      if (publisher) {
        book.publisher = publisher;
      }

      await book.save();
      return book;
    },
  },
};
