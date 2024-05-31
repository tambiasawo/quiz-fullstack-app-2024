import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: " + error);
      process.exit(1);
    });
}
export default dbConnect;
