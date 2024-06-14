import express from 'express';
import { challengeMission } from '../controllers/missionController.js';
import { getMissionsByStoreId } from '../controllers/missionController.js';

const router = express.Router();
router.post('/:missionId/challenge', challengeMission);
router.get('/stores/:storeId/missions', getMissionsByStoreId);


export default router;