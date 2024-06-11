// 파일 위치: /src/routes/reviewRoutes.js

import express from 'express';
import { getMyReviews } from '../controllers/reviewController.js';
import { getUserReviews } from '../models/reviewModel.js';  // 모델에서 함수를 직접 불러오기 보다는 컨트롤러를 거치는 것이 일반적입니다.

const router = express.Router();

// 사용자가 작성한 리뷰 목록 가져오기
router.get('/myreviews', getMyReviews);

// 특정 사용자 ID에 따른 리뷰 목록 가져오기
router.get('/reviews/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const reviews = getUserReviews(userId, page, pageSize);
    res.status(200).json(reviews);
});

export default router;
