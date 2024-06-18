import express from "express";
import { addMissionStore } from "../controllers/mission.controller.js";
import { challengeMission } from "../controllers/mission.controller.js";

export const missionRouter = express.Router();

missionRouter.post('/:storeId', addMissionStore);

missionRouter.post ('/:missionId/challenges', challengeMission);