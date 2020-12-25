import { Schema } from 'mongoose';

var AuthorSchema = new Schema(
  {
    name: {
      en: String,
      zh_hk: String,
    },
    dateOfBirth: Date,
    nationality: String,
  },
  {
    timestamps: true,
  },
);

export { AuthorSchema };
