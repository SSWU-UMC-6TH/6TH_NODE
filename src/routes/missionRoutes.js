import express from 'express';
import { challengeMission } from '../controllers/missionController.js';
import { getStoreMissions } from '../controllers/missionController.js';
const router = express.Router();

router.post('/:missionId/challenge', challengeMission);
router.get('/stores/:storeId/missions', getStoreMissions);

export default router;
