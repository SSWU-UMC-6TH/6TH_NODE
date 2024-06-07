class CreateReviewDto {
constructor(member_id, store_id, body, score) {
    this.member_id = member_id;
    this.store_id = store_id;
    this.body = body;
    this.score = score;
}
}