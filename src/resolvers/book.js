import mongoose from 'mongoose';
import { BookSchema } from '../models/Book.js';
const Book = mongoose.model('book', BookSchema);
import { AuthorSchema } from '../models/Author.js';
const Author = mongoose.model('author', AuthorSchema);
import { PublisherSchema } from '../models/Publisher.js';
const Publisher = mongoose.model('publisher', PublisherSchema);
import elasticClient from '../elasticsearch-client';

export default {
  Query: {
    books: async (parent, { limit, offset }, { models }) => {
      let returnLimit = 20;
      let returnOffset = 0;
      if (limit && limit > 0 && limit < 50) {
        returnLimit = limit;
      }
      if (offset && offset > 0) {
        returnOffset = offset;
      }
      let books = await Book.find().skip(returnOffset).limit(returnLimit);
      return books;
    },
    book: async (parent, { id }, { models }) => {
      let book = await Book.findById(id)
        .populate('authors')
        .populate('publisher');

      return book;
    },
    getBookBySearch: async (parent, { keywords }, { models }) => {
      let searchResult = await elasticClient.search({
        index: 'books',
        body: {
          query: {
            bool: {
              should: [
                { match: { 'book.isbn': keywords } },
                { match: { 'book.title': keywords } },
                { match: { 'book.subtitle': keywords } },
                { match: { 'book.publisher.name.zh_hk': keywords } },
                { match: { 'book.authors.name.zh_hk': keywords } },
              ],
            },
          },
          min_score: 1,
        },
      });
      let result = [];
      if (searchResult.body.hits.hits) {
        result = searchResult.body.hits.hits.map((obj) => {
          return obj._source.book;
        });
      }
      return result;
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
