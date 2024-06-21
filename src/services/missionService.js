import Store from '../models/store.model.js';

class missionService {
  async storeMission(body) {
    try {
      // const newReview = await Store.create({
      //   id: Store.title,
      //   name: Store.content,
      //   review: Store.review
      // });
      const result = {
        status: 200,
        isSuccess: true,
        reward: "보상 내용",
        code: 2000,
        message: "success"
      }
      return result;
    } catch (error) {
      throw new Error(`Could not create review: ${error.message}`);
    }
  }
  async challenge(param) {
    try {
      // const newReview = await Store.create({
      //   id: Store.title,
      //   name: Store.content,
      //   review: Store.review
      // });

      if(param.id == 3) {
        const result = {
          status: 200,
          isSuccess: true,
          code: 2000,
          message: "미션에 도전 가능합니다."
        }
        return result;
      } else {
        const result = {
          status: 200,
          isSuccess: false,
          code: 4000,
          message: "현재 미션에 이미 도전중 입니다."
        }
        return result;
      }
    } catch (error) {
      throw new Error(`Could not create review: ${error.message}`);
    }
  }
}

export default new missionService();