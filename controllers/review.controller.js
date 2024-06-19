import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import { BaseError } from "../config/error.js";
import { addReview } from "../services/review.service.js"
import { getMyReviewsService} from "../services/review.service.js"
import { getStoreReviewsService } from "../services/review.service.js";


export const addReviewStore = async ( req , res , next ) => {
   console.log("가게 리뷰 추가요청");
   console.log("storeId",req.params.storeId);
   console.log("member_id",req.body.member_id);
   console.log("body:", req.body);
   console.log("score",req.body.score);
   const Data ={
      memberId: req.body.member_id,  // 클라이언트에서 보내는 데이터의 필드 이름과 일치시킴
      storeId: req.params.storeId,
      body: req.body.body,
      score: req.body.score
   };
   try{
      res.send(response(status.SUCCESS,await addReview(Data)));
   }
   catch(err){
      throw new BaseError(status.BAD_REQUEST);
   }
   
}

export const getMyReviews = async (req, res, next) => {
   const memberId = req.user.id; // 테스트용 사용자 ID
   const { page = 1,limit = 10} = req.query; //기본값으로 첫번째 페이지와 10개의 리뷰 반환

   console.log("memberId",req.user.id);
   console.log(page);
   console.log(limit);
   try {
      const reviews = await getMyReviewsService(memberId,page,limit);
      res.send(response(status.SUCCESS, reviews));
} catch (err) {
      console.error("Error in getMyReviews:", err);
      next(err); // 더 구체적인 에러 처리를 위해 next()로 전달
}
};

export const getStoreReviews = async (req, res, next) => {
   
   // const storeId = {
   //    storeId: req.params.storeId
   // };
   const storeId = req.params.storeId;
   const { page = 1, limit = 10 } = req.query;

   try {
      const reviews = await getStoreReviewsService(storeId, page, limit);
      res.send(response(status.SUCCESS, reviews));
   } catch (err) {
      console.error("Error in getMyReviews:", err);
      next(err); // 더 구체적인 에러 처리를 위해 next()로 전달
   }
}