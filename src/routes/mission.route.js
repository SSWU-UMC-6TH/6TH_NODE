import express from "express";
import { challengeMission } from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/:missionId/challenge", challengeMission);

export default router;
