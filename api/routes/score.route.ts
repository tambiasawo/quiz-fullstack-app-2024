import express from "express";
import {
  SaveScoreController,
  GetScoresController,
  GetTopScoresController,
} from "../controllers/score.controller";

const Router = express.Router();

Router.post(`/save-score`, SaveScoreController);
Router.get(`/get-scores/:id`, GetScoresController);
Router.get(`/get-top-scores/`, GetTopScoresController);

export default Router;
