import express from "express";
import { addReview } from "../controllers/reviews.controller.js";
import { getMyReviews } from "../controllers/reviews.controller.js"

export const reviewRouter = express.Router();

reviewRouter.get('/reviews/my' , getMyReviews);
reviewRouter.post('/reviews', addReview);

