import express from "express";
import {
  GetMarksController,
  SaveMarksController,
} from "../controllers/marks.controller";

const Router = express.Router();

Router.post(`/save-marks`, SaveMarksController);
Router.get(`/`, GetMarksController);

export default Router;
