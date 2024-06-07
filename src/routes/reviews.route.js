import express from "express";
import { addReview } from "../controllers/reviews.controller.js";

export const reviewRouter = express.Router();

reviewRouter.post('/reviews', addReview);
