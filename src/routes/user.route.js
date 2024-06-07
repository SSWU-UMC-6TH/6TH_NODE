// 이전버전
// import express from "express";
// import { userSignin } from "../controllers/user.controller.js";
// import asyncHandler from 'express-async-handler';

// export const userRouter = express.Router();

// userRouter.post('/signin', userSignin);

// user.route.js (비동기 함수에서 에러처리)
import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));