// 파일 위치: /src/models/reviewModel.js

let reviews = [
    { id: 1, userId: 1, storeId: 1, rating: 5, comment: "Great place!", createdAt: new Date() },
    { id: 2, userId: 1, storeId: 2, rating: 4, comment: "Good service.", createdAt: new Date() },
    { id: 3, userId: 2, storeId: 1, rating: 3, comment: "Okay.", createdAt: new Date() }
];

const getUserReviews = (userId, page, pageSize = 10) => {
    const userReviews = reviews.filter(review => review.userId === userId);
    const paginatedReviews = userReviews.slice((page - 1) * pageSize, page * pageSize);
    return paginatedReviews;
};

export { getUserReviews };
