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

export const getReviewsByMemberId = async (memberId, limit, offset) => {
    if (memberId === undefined || limit === undefined || offset === undefined) {
        throw new Error('Missing required fields');
    }
    const query = `
        SELECT id as reviewId, store_id as storeId, body, score, created_at as createdAt, updated_at as updatedAt
        FROM review
        WHERE member_id = ?
        ORDER BY id DESC
        LIMIT ${parseInt(limit, 10)}
        OFFSET ${parseInt(offset, 10)}
    `;
    // console.log("dao단 테스트",memberId,limit,offset);
    // const [rows] = await pool.execute(query, [memberId, parseInt(limit,10), parseInt(offset,10)]);
    // return rows;
    console.log("Executing query with params:", memberId, limit, offset);
    const [rows] = await pool.execute(query, [memberId]);
    console.log("Query result:", rows);
    return rows;
};

export const getTotalReviewsCount = async (memberId) => {
    const query = `
        SELECT COUNT(*) as total
        FROM review
        WHERE member_id = ?
    `;
    const [rows] = await pool.execute(query, [memberId]);
    return rows[0].total;
    
};

export const getReviewsByStoreId = async (storeId, limit, offset) => {
    if (storeId === undefined || limit === undefined || offset === undefined) {
    throw new Error("Missing required fields");
    }
    const query = `
        SELECT id as reviewId, member_id as memberId, body, score, created_at as createdAt, updated_at as updatedAt
        FROM review
        WHERE store_id = ?
        ORDER BY id DESC
        LIMIT ${parseInt(limit, 10)}
        OFFSET ${parseInt(offset, 10)}
    `;
    console.log("Executing query with params:", storeId, limit, offset);
    const [rows] = await pool.execute(query, [storeId]);
    console.log("Query result:", rows);
    return rows;
};

export const getTotalReviewsCountByStore = async (storeId) => {
    const query = `
        SELECT COUNT(*) as total
        FROM review
        WHERE store_id = ?
    `;
    const [rows] = await pool.execute(query, [storeId]);
    return rows[0].total;
};