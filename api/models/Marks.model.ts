import mongoose, { Schema } from "mongoose";
import User from "./User.model";

const marksSchema = new Schema(
  {
    marksId: {
      type: String,
      required: true,
      unique: true,
    },
    marks: { type: Array, required: true },
  },
  { timestamps: true }
);

const Mark = mongoose.model("marks", marksSchema);

export default Mark;

/*when someone clicks on view, it will fetch the marks from the marks database
, using the marksId from that score emtry  */
