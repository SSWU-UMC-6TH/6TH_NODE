import { findStoreById } from '../models/store.dao.js';
import { addReview as addReviewToDB } from '../models/review.dao.js';
import { BaseError } from '../config/error.js';
import { status } from "../config/response.status.js"
import { getReviewsByMemberId,getTotalReviewsCount } from "../models/review.dao.js"
import { getReviewsByStoreId, getTotalReviewsCountByStore } from '../models/review.dao.js';

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

export const getMyReviewsService = async (memberId,page,limit) => {
   try{
      const offset = (page - 1) * limit;
      
      console.log("offset:",offset);

      //리뷰 가져오기
      const reviews = await getReviewsByMemberId(memberId, limit, offset);

      //전체 리뷰수 가져오기
      const totalReviews = await getTotalReviewsCount(memberId);

      //총 페이지 수 계산
      const totalPages = Math.ceil(totalReviews / limit);

      //결과 반환
      return {
         reviews,
         currentPage: page,
         totalPages,
         totalReviews
      }
}catch(err){
   console.error("Error in getMyReviewsService:", err);
   throw new BaseError(status.INTERNAL_SERVER_ERROR);
   }
   
};

export const getStoreReviewsService = async( storeId,page,limit)=>{
   try{
      const offset = (page - 1) * limit;
      
      console.log("offset:",offset);

      //리뷰 가져오기
      const reviews = await getReviewsByStoreId(storeId, limit, offset);

      //전체 리뷰수 가져오기
      const totalReviews = await getTotalReviewsCountByStore(storeId);

      //총 페이지 수 계산
      const totalPages = Math.ceil(totalReviews / limit);

      //결과 반환
      return {
         reviews,
         currentPage: page,
         totalPages,
         totalReviews
      }
}catch(err){
   console.error("Error in getMyReviewsService:", err);
   throw new BaseError(status.INTERNAL_SERVER_ERROR);
   }
};
