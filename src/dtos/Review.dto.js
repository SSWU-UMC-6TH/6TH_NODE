class CreateReviewDto {
constructor(member_id, store_id, body, score) {
    this.member_id = member_id;
    this.store_id = store_id;
    this.body = body;
    this.score = score;
}
}

class ReviewListResponseDto {
    constructor(reviews, nextCursor) {
      this.reviews = reviews.map(review => ({
        id: review.id,
        member_id: review.member_id,
        store_id: review.store_id,
        body: review.body,
        score: review.score,
        createdAt: review.createdAt
      }));
      this.nextCursor = nextCursor;
    }
  }