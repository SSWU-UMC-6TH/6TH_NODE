import express from 'express';
import { addStore, addReviewToStore, addMissionToStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', addStore);
router.post('/:storeId/reviews', addReviewToStore);
router.post('/:storeId/missions', addMissionToStore);

export default router;