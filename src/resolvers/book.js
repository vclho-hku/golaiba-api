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
    getBookBySearch: async (
      parent,
      { keywords, limit, offset },
      { models },
    ) => {
      // let test = await elasticClient.cat.indices({});
      // console.log(test);
      // await elasticClient.indices.delete({
      //   index: 'books',
      // });

      // await elasticClient.indices.create({
      //   index: 'books',
      // });
      // let book = await Book.findById('5fea03c9a5b57b7bf0b51bcf')
      //   .populate('authors')
      //   .populate('publisher');
      // await elasticClient.index({
      //   index: 'books',
      //   id: book.id,
      //   body: { book: book },
      // });
      // return [];

      // await elasticClient.indices.putMapping({
      //   index: 'books',
      //   body: {
      //     properties: {
      //       book: {
      //         properties: {
      //           title: {
      //             type: 'text',
      //             analyzer: 'ik_max_word',
      //             search_analyzer: 'ik_smart',
      //             fields: {
      //               keyword: {
      //                 type: 'keyword',
      //                 ignore_above: 256,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // let mapping = await elasticClient.indices.getMapping({
      //   index: 'books',
      // });
      // console.log(mapping.body.books.mappings);
      let searchResult = await elasticClient.search({
        index: 'books',
        from: offset,
        size: limit,
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
