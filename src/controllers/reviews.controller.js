import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import ReviewService from "../services/reviews.service.js";

export const addReview = async (req, res, next) => {
   try {
      const { member_id, store_id, body, score } = req.body;

      if (!member_id || !store_id || !body || typeof score !== 'number') {
         return res.status(400).send(response(status.BAD_REQUEST, '모든 필드가 필요, score는 숫자여야 합니다.'));
      }

      const reviewDto = { member_id, store_id, body, score };

      const reviewId = await ReviewService.addReview(reviewDto);

      res.status(201).send(response(status.SUCCESS, { id: reviewId, message: '리뷰가 추가되었습니다.' }));
   } catch (error) {
      if (error.data.code === status.ARTICLE_NOT_FOUND.code) {
         res.status(404).send(response(status.ARTICLE_NOT_FOUND, '해당 가게를 찾을 수 없습니다.'));
      } else {
         console.error('리뷰 추가 중 오류 발생:', error);
         res.status(500).send(response(status.INTERNAL_SERVER_ERROR, '리뷰 추가 중 오류가 발생했습니다.'));
      }
   }
};

