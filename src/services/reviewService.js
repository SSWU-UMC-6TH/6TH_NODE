import { BaseError } from "../../config/error.js";

export const getMyReviews = async (userId) => {
    try {
        const sql = 'SELECT * FROM reviews WHERE user_id = ?'; // 사용자 ID를 기반으로 리뷰를 조회하는 SQL 쿼리
        const [rows, fields] = await db.query(sql, [userId]); // 데이터베이스에서 쿼리 실행
        return rows; // 조회된 리뷰 목록 반환
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        throw new BaseError('Failed to fetch user reviews'); // 오류 처리
    }
};