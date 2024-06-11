import express from 'express';
import { getUserMissions, completeUserMission } from '../controllers/userMissionController.js';

const router = express.Router();

router.get('/users/:userId/missions', getUserMissions);
// 진행 중인 미션을 완료 상태로 변경하는 라우트
router.patch('/users/:userId/missions/:missionId/complete', completeUserMission);

export default router;
