const ReviewDAO = require('../models/review.dao');
const CreateReviewDto = require('../dtos/review.dto');

class ReviewService {
   static async addReview(reviewData) {
      const reviewDto = new CreateReviewDto(reviewData.member_id, reviewData.store_id, reviewData.body, reviewData.score);

      const store = await ReviewDAO.findStoreById(reviewDto.store_id);
      if (!store) {
         throw new Error('가게를 찾을 수 없습니다');
      }

      const reviewId = await ReviewDAO.createReview(reviewDto);
      return reviewId;
   }
}

module.exports = ReviewService;
