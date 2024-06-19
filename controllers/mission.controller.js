import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import { BaseError } from "../config/error.js";
import { addMission } from "../services/mission.service.js"
import {challengeMissionService } from "../services/mission.service.js"
import { getStoreMissionsService } from "../services/mission.service.js";
import { getMissionsOngoingService} from "../services/mission.service.js"
export const addMissionStore = async ( req , res , next ) => {
   console.log("가게 미션 추가요청");
   console.log("storeId",req.params.storeId);
   console.log("reward",req.body.reward);
   console.log("deadline", req.body.deadline);
   console.log("mission_spec",req.body.mission_spec);

   const Data ={
      storeId: req.params.storeId,
      reward: req.body.reward,
      deadline: req.body.deadline,
      mission_spec: req.body.mission_spec
   };
   if (!Data.storeId || !Data.reward || !Data.deadline || !Data.mission_spec) {
      return res.status(status.BAD_REQUEST).send(response(status.BAD_REQUEST, "Missing required fields"));
   }

   const deadlineDate = new Date(Data.deadline);
   if (isNaN(deadlineDate.getTime())) {
      return res.status(status.BAD_REQUEST).send(response(status.BAD_REQUEST, "Invalid date format"));
   }
   try{
      res.send(response(status.SUCCESS,await addMission(Data)));
   }
   catch(err){
      throw new BaseError(status.BAD_REQUEST);
      // console.error("Error in addMissionStore:", err);
      // next(err);
   }
   
}

export const challengeMission = async (req, res, next) => {
   console.log("미션 도전 요청");
   console.log("missionId", req.params.missionId);
   console.log("memberId", req.body.memberId);
   console.log("statusId", req.body.statusId);

   const data = {
      missionId: req.params.missionId,
      memberId: req.body.memberId,
      statusId: req.body.statusId
   };

   // 필수 필드 검증
   if (!data.missionId || !data.memberId || !data.statusId) {
      return res.status(status.BAD_REQUEST).send(response(status.BAD_REQUEST, "Missing required fields"));
   }

   try {
      const result = await challengeMissionService(data);
      res.send(response(status.SUCCESS, result));
} catch (err) {
   throw new BaseError(status.BAD_REQUEST);
}
};

export const getStoreMissions = async (req, res, next) => {
   
   const storeId = req.params.storeId;
   const { page = 1, limit = 10 } = req.query;

   try {
      const missions = await getStoreMissionsService(storeId, page, limit);
      res.send(response(status.SUCCESS, missions));
   } catch (err) {
      console.error("Error in getMyMissions:", err);
      next(err); // 더 구체적인 에러 처리를 위해 next()로 전달
   }
};

export const getMissionsOngoing = async (req, res, next) => {
   const memberId = req.user.id; // Authenticate 미들웨어를 통해 얻은 사용자 ID
   const { page = 1, limit = 10 } = req.query;

   try {
      const missions = await getMissionsOngoingService(memberId, page, limit);
      res.send(response(status.SUCCESS, missions));
      } catch (err) {
      console.error("Error in getMissionsOngoing:", err);
      next(err); // 더 구체적인 에러 처리를 위해 next()로 전달
   }
};