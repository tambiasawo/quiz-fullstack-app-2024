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
import path from "path";

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
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

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

app.use("*", (req, res) => {
  //route that doenst match our provided routes
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
