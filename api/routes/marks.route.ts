import express from "express";
import { SaveMarksController } from "../controllers/marks.controller";

const Router = express.Router();

Router.post(`/save-marks`, SaveMarksController);
export default Router;
