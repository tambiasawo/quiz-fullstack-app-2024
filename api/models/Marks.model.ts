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
    marksId: {
      type: String,
      required: true,
      unique: true,
    },
    scoreCount: { type: Number, required: true },
    marks: { type: Array, required: true },
  },
  { timestamps: true }
);

const Mark = mongoose.model("marks", marksSchema);

export default Mark;

/*when someone clicks on view, it will fetch the marks from the marks database
, using the marksId from that score emtry  */
