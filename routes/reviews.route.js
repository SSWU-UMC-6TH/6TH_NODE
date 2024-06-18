import express from "express";
import { addReviewStore } from "../controllers/review.controller.js";

export const reviewRouter = express.Router();

reviewRouter.post('/:storeId', addReviewStore);

