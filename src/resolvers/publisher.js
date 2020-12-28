import mongoose from 'mongoose';
import { PublisherSchema } from '../models/Publisher.js';
const Publisher = mongoose.model('publisher', PublisherSchema);

export default {
  Query: {
    publisher: async (parent, { id }, { models }) => {
      let publisher = await Publisher.findById(id);
      return publisher;
    },
  },
  Mutation: {
    createPublisher: async (parent, { name, data }, { models }) => {
      let payload = data;
      payload.name = name;
      let publisher = await new Publisher(payload);
      await publisher.save();
      return publisher;
    },
  },
};
