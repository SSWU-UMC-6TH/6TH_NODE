import express from "express";
import { addMissionStore, getStoreMissions } from "../controllers/mission.controller.js";
import { challengeMission } from "../controllers/mission.controller.js";
import mockAuthenticate from "../middlwares/Authenticate.js";
import { getMissionsOngoing } from "../controllers/mission.controller.js";

export const missionRouter = express.Router();
//가게에 미션추가
missionRouter.post('/:storeId', addMissionStore);
//가게의 미션을 도전 중인 미션에 추가
missionRouter.post ('/:missionId/challenges', challengeMission);
//특정 가게의 미션 목록
missionRouter.get('/:storeId/list', getStoreMissions);
//내가 진행중인 미션 목록
missionRouter.get("/my/ongoing", mockAuthenticate, getMissionsOngoing);

