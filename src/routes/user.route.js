// routes/user.route.js
import express from "express";
import { userSignin } from "/Users/doeunkim/umc_8/src/controllers/user.controoler.js";

export const userRouter = express.Router();

userRouter.post("/signin", userSignin);
