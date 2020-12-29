import { Schema } from 'mongoose';

var AuthorSchema = new Schema(
  {
    name: {
      en_us: String,
      zh_hk: String,
      ja_jp: String,
    },
    dateOfBirth: Date,
    introduction: String,
    nationality: String,
  },
  {
    timestamps: true,
  },
);

export { AuthorSchema };
