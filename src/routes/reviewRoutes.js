import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMyReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getMyReview);

export default router;