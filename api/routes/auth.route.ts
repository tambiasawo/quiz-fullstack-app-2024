import express from "express";
import {
  SignInController,
  SignOutController,
  SignUpController,
} from "../controllers/auth.controller";

const Router = express.Router();

Router.post(`/signin`, SignInController);
Router.get(`/signout`, SignOutController);
Router.post(`/signup`, SignUpController);

export default Router;
