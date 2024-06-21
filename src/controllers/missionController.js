import missionService from '../services/missionService.js';
import StoreDTO from '../dtos/storeDto.js';

class missionController {
  async storeMission(req, res) {
    // const { title, content, rating } = req.body;
    // const reviewDTO = new StoreDTO(title, content, rating);

    try {
      const result = await missionService.storeMission(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async challenge(req, res) {
    // const { title, content, rating } = req.body;
    // const reviewDTO = new StoreDTO(title, content, rating);

    try {
      const result = await missionService.challenge(req.params);
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new missionController();