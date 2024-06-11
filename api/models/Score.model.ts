import mongoose, { Schema } from "mongoose";
import User from "./User.model";

const scoreSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: User,
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
