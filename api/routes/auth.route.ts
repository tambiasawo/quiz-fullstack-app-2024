import express from "express";
import {
  SignInController,
  SignOutController,
  SignUpController,
} from "../controllers/auth.controller";
import verifyToken from "../utils/verifyToken";

const Router = express.Router();

Router.post(`/signin`, SignInController);
Router.get(`/signout`, SignOutController);
Router.post(`/signup`, SignUpController);

export default Router;
