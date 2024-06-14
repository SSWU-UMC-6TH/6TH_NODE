import express from 'express';
import asyncHandler from 'express-async-handler';
import { addStore, addReviewToStore, addMissionToStore, reviewPreview } from '../controllers/storeController.js';

const router = express.Router();
export const storeRouter= express.Router({mergeParams: true});


// POST / - 새로운 가게 추가
router.post('/', addStore);

// POST /:storeId/reviews - 특정 가게에 리뷰 추가
router.post('/:storeId/reviews', addReviewToStore);

// POST /:storeId/missions - 특정 가게에 미션 추가
router.post('/:storeId/missions', addMissionToStore);

// GET /missions - 모든 미션 목록 조회
router.get('/missions', asyncHandler(async (req, res) => {
    const missions = getMissions();
    res.json(missions);
}));

// POST /missions - 새로운 미션 생성
router.post('/missions', asyncHandler(async (req, res) => {
    const { storeId, description, reward } = req.body;
    const newMission = await createMission(storeId, description, reward);
    res.status(201).json(newMission);
}));

// PUT /missions/:missionId/complete - 미션 완료 처리
router.put('/missions/:missionId/complete', asyncHandler(async (req, res) => {
    const { missionId } = req.params;
    const completedMission = await completeMission(missionId);
    res.json(completedMission);
}));

storeRouter.get('/reviews', asyncHandler(reviewPreview));
export default router;