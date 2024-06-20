import express from "express";
import {userSignin,getMission} from "../controllers/userController.js";

export const userRouter = express.Router();


userRouter.post("/signin", userSignin);
userRouter.post("/mission/ing", getMission);
