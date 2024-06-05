import mongoose, { Schema } from "mongoose";

const scoreSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    questionsCount: { type: Number, required: true },
    score: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Score = mongoose.model("scores", scoreSchema); //ensure a db called users doesnt already exist

export default Score;
