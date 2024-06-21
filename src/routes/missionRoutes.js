import express from 'express';
const router = express.Router();
import missionController from '../controllers/missionController.js';

router.post('/:id/challenge', missionController.challenge);

export default router;