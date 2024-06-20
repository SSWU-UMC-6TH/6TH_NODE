import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { reviewService } from "../services/review.service.js";

export const reviewController = async (req, res, next) => {
  console.log("리뷰 추가요청");
  res.send(response(status.SUCCESS, await reviewService(req.body)));
};