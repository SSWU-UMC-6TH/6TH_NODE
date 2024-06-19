import { findStoreById } from '../models/store.dao.js';
import { addMission as addMissionToDB } from '../models/mission.dao.js';
import { BaseError } from '../config/error.js';
import { status } from "../config/response.status.js"
import { findMissionByMemberAndMissionId, addMemberMission } from '../models/mission.dao.js';
import { getMissionsByStoreId, getTotalMissionsCountByStore } from '../models/mission.dao.js';
import { getOngoingMissionsByMemberId,getTotalOngoingMissionsCountByMemberId } from '../models/mission.dao.js';

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

export const getStoreMissionsService = async (storeId, page, limit) => {
  try {
    const offset = (page - 1) * limit;

    console.log("offset:", offset);

    //미션 가져오기
    const missions = await getMissionsByStoreId(storeId, limit, offset);

      //전체 미션수 가져오기
      const totalMissions = await getTotalMissionsCountByStore(storeId);

      //총 페이지 수 계산
      const totalPages = Math.ceil(totalMissions / limit);

      //결과 반환
      return {
         missions,
         currentPage: page,
         totalPages,
         totalMissions,
      };
   } catch (err) {
      console.error("Error in getMyMissionsService:", err);
      throw new BaseError(status.INTERNAL_SERVER_ERROR);
   }
   };

export const getMissionsOngoingService = async (memberId, page, limit) => {
   try {
      const offset = (page - 1) * limit;
      console.log("offset:", offset);

      // 진행 중인 미션 가져오기
      const missions = await getOngoingMissionsByMemberId(memberId, parseInt(limit, 10), parseInt(offset, 10));
      console.log("Service layer - Ongoing Missions:", missions);

      // 전체 진행 중인 미션 수 가져오기
      const totalMissions = await getTotalOngoingMissionsCountByMemberId(memberId);

      // 총 페이지 수 계산
      const totalPages = Math.ceil(totalMissions / limit);

      // 결과 반환
      return {
            missions,
            currentPage: page,
            totalPages,
            totalMissions
      };
   } catch (err) {
      console.error("Error in getMissionsOngoingService:", err);
      throw new BaseError(status.INTERNAL_SERVER_ERROR);
   }
};

