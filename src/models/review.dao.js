import { BaseError } from '../errors'; // 오류 처리 관련 모듈

class Review {
    constructor(reviewData) {
        if (reviewData) {
            this.id = reviewData.id;
            this.userId = reviewData.userId;
            this.storeId = reviewData.storeId;
            this.rating = reviewData.rating;
            this.comment = reviewData.comment;
            this.createdAt = reviewData.createdAt;
        }
    }

    // 리뷰 생성
    static async create(userId, storeId, rating, comment) {
        try {
            const createdAt = new Date(); // 현재 시각
            const sql = 'INSERT INTO reviews (user_id, store_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)';
            const [result] = await db.query(sql, [userId, storeId, rating, comment, createdAt]);
            const newReviewId = result.insertId; // 새로 생성된 리뷰의 ID
            const newReviewData = { id: newReviewId, userId, storeId, rating, comment, createdAt };
            return new Review(newReviewData); // 생성된 리뷰 객체 반환
        } catch (error) {
            console.error('Error creating review:', error);
            throw new BaseError('Failed to create review'); // 오류 처리
        }
    }

    // 특정 사용자의 리뷰 조회
    static async getByUserId(userId) {
        try {
            const sql = 'SELECT * FROM reviews WHERE user_id = ?';
            const [rows, fields] = await db.query(sql, [userId]);
            return rows.map(reviewData => new Review(reviewData)); // 조회된 모든 리뷰 객체 반환
        } catch (error) {
            console.error('Error fetching user reviews:', error);
            throw new BaseError('Failed to fetch user reviews'); // 오류 처리
        }
    }

    // 특정 가게의 리뷰 조회
    static async getByStoreId(storeId) {
        try {
            const sql = 'SELECT * FROM reviews WHERE store_id = ?';
            const [rows, fields] = await db.query(sql, [storeId]);
            return rows.map(reviewData => new Review(reviewData)); // 조회된 모든 리뷰 객체 반환
        } catch (error) {
            console.error('Error fetching store reviews:', error);
            throw new BaseError('Failed to fetch store reviews'); // 오류 처리
        }
    }
}

export default Review;
