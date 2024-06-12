import mongoose, { Schema } from "mongoose";
import User from "./User.model";

const marksSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: User,
    },
    scoreCount: { type: Number, required: true },
    marks: { type: Array, required: true },
  },
  { timestamps: true }
);

const Mark = mongoose.model("marks", marksSchema);

export default Mark;
