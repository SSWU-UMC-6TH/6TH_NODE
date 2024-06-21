import StoreService from '../services/storeService.js';
import StoreDTO from '../dtos/storeDto.js';

class StoreController {
  async createReview(req, res) {
    // const { store_id, review } = req.body;
    // const storeDTO = new StoreDTO(store_id, review);

    try {
    //   const newReview = await StoreService.createReview(storeDTO);
    const result = await StoreService.createReview(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new StoreController();