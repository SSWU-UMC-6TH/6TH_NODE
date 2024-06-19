import express from "express";
import { addReviewStore } from "../controllers/review.controller.js";
import { getMyReviews} from "../controllers/review.controller.js";
import  mockAuthenticate  from "../middlwares/Authenticate.js";


export const reviewRouter = express.Router();
//가게에 미션추가
reviewRouter.post('/:storeId', addReviewStore);
//특정 가게의 미션 목록
// reviewRouter.get('/:storeId/list', getStoreReviews);
//내가 작성한 리뷰 목록
reviewRouter.get ('/my',mockAuthenticate, getMyReviews);
