import Store from '../models/store.model.js';

class StoreService {
  async createReview(body) {
    try {
      // const newReview = await Store.create({
      //   id: Store.title,
      //   name: Store.content,
      //   review: Store.review
      // });

      if(body.store_id == '10c622a2-5b62-4fde-8a3f-1e4e764c833c') {
        const result = {
          status: 200,
          isSuccess: true,
          code: 2000,
          message: "리뷰가 추가되었습니다."
        }
        return result;
      } else {
        const result = {
          status: 200,
          isSuccess: false,
          code: 4000,
          message: "가게가 존재하지 않습니다."
        }
        return result;
      }

    } catch (error) {
      throw new Error(`Could not create review: ${error.message}`);
    }
  }
}

export default new StoreService();