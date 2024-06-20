import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { missionService } from "../services/mission.service.js";

export const missionController = async (req, res, next) => {
  console.log("미션 추가(도전)");
  res.send(response(status.SUCCESS, await missionService(req.body)));
};