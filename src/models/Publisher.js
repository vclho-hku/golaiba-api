import { Schema } from 'mongoose';

var PublisherSchema = new Schema(
  {
    name: {
      en_us: String,
      zh_hk: String,
      ja_jp: String,
    },
    introduction: String,
    foundedDate: Date,
    officialWebsite: String,
  },
  {
    timestamps: true,
  },
);

export { PublisherSchema };
