import { Schema } from 'mongoose';

var AuthorSchema = new Schema(
  {
    name: String,
    dateOfBirth: Date,
    nationality: String,
  },
  {
    timestamps: true,
  },
);

export { AuthorSchema };
