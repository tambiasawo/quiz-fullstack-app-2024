import express from "express";
import QuizRouter from "./quiz.route";
import AuthRouter from "./auth.route";
import ScoreRouter from "./score.route";
import MarksRouter from "./marks.route";
import userRouter from "./user.route";

const mainRouter = express.Router();

mainRouter.use("/quiz", QuizRouter);
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/scores", ScoreRouter);
mainRouter.use("/marks", MarksRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
