import { pool } from "../config/db.config.js";
// import { BaseError } from "../../config/error";
// import { status } from "../../config/response.status";

export const addReview = async (reviewData) => {
   const { memberId, storeId, body, score } = reviewData;
   if (memberId === undefined || storeId === undefined || body === undefined || score === undefined) {
      throw new Error('Missing required fields');
  }
   const query = `
       INSERT INTO review (member_id, store_id, body, score, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())
   `;
   const [result] = await pool.execute(query, [memberId, storeId, body, score]);
   return result.insertId;
};