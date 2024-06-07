const db = require('../../config/db.config');

class ReviewDAO {
    static async findStoreById(store_id) {
        const [rows] = await db.execute('SELECT * FROM store WHERE id = ?', [store_id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async createReview(reviewDto) {
        const { member_id, store_id, body, score } = reviewDto;
        const [result] = await db.execute(
            'INSERT INTO review (member_id, store_id, body, score, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [member_id, store_id, body, score]
        );
        return result.insertId;
    }
}

module.exports = ReviewDAO;