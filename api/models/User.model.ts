import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    company: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1715204462~exp=1715208062~hmac=f75ec46861c8aeb553ac35637f1af812aa3757611b42f5a3d1c1044ce2b29b7b&w=100",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema); //ensure a db called users doesnt already exist

export default User;
