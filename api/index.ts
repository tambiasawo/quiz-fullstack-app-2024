import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import QuizRouter from "./routes/quiz.route";
import AuthRouter from "./routes/auth.route";
import MarksRouter from "./routes/marks.route";
import express from "express";
import dbConnect from "./utils/dbConnect";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import ScoreRouter from "./routes/score.route";
dbConnect();

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(`/api/quiz`, QuizRouter);
app.use(`/api/auth`, AuthRouter);
app.use("/api/scores", ScoreRouter);
app.use("/api/marks", MarksRouter);

app.use(errorHandler);
app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
