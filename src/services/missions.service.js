const MissionDAO = require('../models/mission.dao');
const { CreateMissionDto, CreateMissionChallengeDto } = require('../dtos/mission.dto');

class MissionService {
   static async addMission(missionData) {
      const missionDto = new CreateMissionDto(missionData.store_id, missionData.reward, missionData.deadline, missionData.mission_spec);
      const missionId = await MissionDAO.createMission(missionDto);
      return missionId;
   }

   static async addMissionChallenge(missionData) {
      const missionDto = new CreateMissionChallengeDto(missionData.member_id, missionData.mission_id);

      //미션 존재 여부
      const mission = await MissionDAO.findMissionById(missionDto.mission_id);
      if (!mission) {
         throw new Error('미션을 찾을 수 없습니다');
      }

      // member가 이미 미션을 도전중인지 확인
      const existingMemberMission = await MissionDAO.findMemberMission(missionDto.member_id, missionDto.mission_id);
      if (existingMemberMission) {
         throw new Error('이미 해당 미션에 도전 중입니다');
      }

      // 미션 생성
      const memberMissionId = await MissionDAO.createMemberMission(missionDto.member_id, missionDto.mission_id);
      return memberMissionId;
   }

   static async getMyMissions(userId, cursor) {
      const limit = 10;  // 한 페이지당 가져올 미션의 수
      const missions = await MissionDAO.getMyMissions(userId, limit, cursor);
      const nextCursor = missions.length === limit ? missions[missions.length - 1].id : null;

   return { missions, nextCursor };
   }

   static async getStoreMissions(storeId, cursor) {
   const limit = 10;  // 한 페이지당 가져올 미션의 수
   const missions = await MissionDAO.getStoreMissions(storeId, limit, cursor);
   const nextCursor = missions.length === limit ? missions[missions.length - 1].id : null;

   return { missions, nextCursor };
   }
}

module.exports = MissionService;

