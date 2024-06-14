import { getMyReviews } from '../services/reviewService.js';

export const getMyReview = async (req, res) => {
    const userId = req.user.id; // 예시에서는 사용자 ID를 토큰에서 가져온다고 가정
    try {
        const reviews = await getMyReviews(userId); // 사용자 ID를 기반으로 리뷰 가져오기
        res.status(200).json(reviews); // 리뷰 목록을 JSON 형태로 응답
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).json({ message: 'Failed to fetch user reviews' }); // 오류 발생 시 500 에러 응답
    }
};
