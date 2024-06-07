import express from "express";
import {
  addStore,
  addReviewToStore,
  addMissionToStore,
} from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", addStore);
router.post("/stores/:storeId/reviews", addReviewToStore);
router.post("/stores/:storeId/missions", addMissionToStore);

export default router;
