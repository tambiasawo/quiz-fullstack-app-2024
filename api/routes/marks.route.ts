import express from "express";
import {
  GetMarkController,
  SaveMarksController,
} from "../controllers/marks.controller";

const Router = express.Router();

Router.post(`/save-marks`, SaveMarksController);
Router.get(`/get-mark/:id`, GetMarkController);

export default Router;
