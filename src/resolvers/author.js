import mongoose from 'mongoose';
import { AuthorSchema } from '../models/Author.js';
const Author = mongoose.model('author', AuthorSchema);

export default {
  Query: {
    author: async (parent, { id }, { models }) => {
      let author = await Author.findById(id);
      return author;
    },
  },
  Mutation: {
    createAuthor: async (parent, { data }, { models }) => {
      console.log(data);
      let author = await new Author(data);
      await author.save();
      return author;
    },
  },
};
