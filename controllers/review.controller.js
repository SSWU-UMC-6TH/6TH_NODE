import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import { BaseError } from "../config/error.js";
import { addReview } from "../services/review.service.js"


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