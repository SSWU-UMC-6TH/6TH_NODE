import { findStoreById } from '../models/store.dao.js';
import { addMission as addMissionToDB } from '../models/mission.dao.js';
import { BaseError } from '../config/error.js';
import { status } from "../config/response.status.js"
import { findMissionByMemberAndMissionId, addMemberMission } from '../models/mission.dao.js';

export const addMission = async (missionData) => {
   const  {storeId, reward,deadline,mission_spec} = missionData;
    //가게 존재여부 확인
      const store = await findStoreById(storeId);
      if (!store) {
         throw new BaseError (status.STORE_NOT_EXIST);
      }

      //미션데이터

      const mission = {
         storeId,
         reward,
         deadline,
         mission_spec
      };

      // missiondb에 데이터 삽입
      const reviewId = await addMissionToDB(mission);
      return { reviewId };
};

export const challengeMissionService = async (missionData) => {
   const { missionId, memberId, statusId } = missionData;

   // 미션 도전 중인지 확인
   const existingMission = await findMissionByMemberAndMissionId(memberId, missionId);
   if (existingMission) {
       throw new BaseError(status.ALREADY_CHALLENGED);
   }

   // 새로운 도전 추가
   const newChallenge = {
      memberId,
      missionId,
      statusId
   };

   const challengeId = await addMemberMission(newChallenge);
   return { challengeId };
};