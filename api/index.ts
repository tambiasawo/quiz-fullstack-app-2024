import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import dbConnect from "./utils/dbConnect";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import mainRouter from "./routes";

dbConnect();

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(`/api`, mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
