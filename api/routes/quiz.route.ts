import express from "express";
import { QuickQuizController } from "../controllers/quickquiz.controller";

const Router = express.Router();

Router.get(`/`, QuickQuizController);
export default Router;
