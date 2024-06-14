import express from 'express';
import { getStoreMissions } from '../controllers/missions.controller.js';

const router = express.Router();

router.get('/:storeId/missions', getStoreMissions);

export default router;