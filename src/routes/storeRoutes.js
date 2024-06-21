import express from 'express';
const router = express.Router();
import storeController from '../controllers/storeController.js';
import missionController from '../controllers/missionController.js';

router.post('/reviews', storeController.createReview);
router.post('/:id/missions', missionController.storeMission);

export default router;