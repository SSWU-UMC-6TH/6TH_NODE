// 파일 위치: /src/controllers/reviewController.js

import { getUserReviews } from '../models/reviewModel.js';

const getMyReviews = async (req, res) => {
    const userId = req.userId; // Assumed: req.userId is set by middleware
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const reviews = getUserReviews(userId, page, pageSize);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving reviews" });
    }
};

export { getMyReviews };
