import express from "express";
import {
  SaveScoreController,
  GetScoresController,
} from "../controllers/score.controller";

const Router = express.Router();

Router.post(`/save-score`, SaveScoreController);
Router.get(`/get-scores/:id`, GetScoresController);

export default Router;
