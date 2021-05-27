import { Schema } from 'mongoose';

const CelebritySchema = new Schema(
  {
    name: {
      en_us: String,
      zh_hk: String,
      zh_tw: String,
      ja_jp: String,
    },
    isStarCelebrity: { type: Boolean, default: false },
    isStarPrize: { type: Boolean, default: false },
    isPrize: { type: Boolean, default: false },
    recommendBooks: [
      {
        year: String,
        description: String,
        isKeyRecommend: { type: Boolean, default: false },
        book: {
          type: Schema.Types.ObjectId,
          ref: 'book',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export { CelebritySchema };
