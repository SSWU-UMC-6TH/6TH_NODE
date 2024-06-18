import { pool } from "../config/db.config.js";
// import { BaseError } from "../../config/error";
// import { status } from "../../config/response.status";

export const findStoreById = async (storeId) => {
   const query = 'SELECT * FROM store WHERE id = ?';
   const [rows] = await pool.execute(query, [storeId]);
   return rows[0];
};