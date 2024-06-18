import { findStoreById } from '../models/store.dao.js';
import { addReview as addReviewToDB } from '../models/review.dao.js';
import { BaseError } from '../config/error.js';
import { status } from "../config/response.status.js"

export const addReview = async (reviewData) => {
   const {storeId, memberId, body, score} = reviewData;
    //가게 존재여부 확인
      const store = await findStoreById(storeId);
      if (!store) {
         throw new BaseError (status.STORE_NOT_EXIST);
      }

      //리뷰 데이터 

      const review = {
         memberId,
         storeId,
         body,
         score
      };

      // reviewdb에 데이터 삽입
      const reviewId = await addReviewToDB(review);
      return { reviewId };
};

