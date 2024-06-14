import { response } from "../../config/response.status.js";
import { status } from "../../config/response.status.js";
import MissionService from "../services/missions.service.js";

export const addMission = async (req, res, next) => {
  try {
    const { store_id, reward, deadline, mission_spec } = req.body;

    if (!store_id || !reward || !deadline || !mission_spec) {
      return res.status(400).send(response(status.BAD_REQUEST, null));
    }

    const missionDto = { store_id, reward, deadline, mission_spec };

    const missionId = await MissionService.addMission(missionDto);

    res.status(201).send(response(status.SUCCESS, { id: missionId }));
  } catch (error) {
    console.error("미션 추가 중 오류 발생:", error);
    res.status(500).send(response(status.INTERNAL_SERVER_ERROR, null));
  }
};

export const addMissionChallenge = async (req, res, next) => {
  try {
    const { member_id, mission_id } = req.body;

    if (!member_id || !mission_id) {
      return res.status(400).send(response(status.BAD_REQUEST, null));
    }

    const missionChallengeDto = { member_id, mission_id };

    const memberMissionId = await MissionService.addMissionChallenge(
      missionChallengeDto
    );

    res.status(201).send(response(status.SUCCESS, { id: memberMissionId }));
  } catch (error) {
    if (error.data.code === status.ARTICLE_NOT_FOUND.code) {
      res.status(404).send(response(status.ARTICLE_NOT_FOUND, null));
    } else if (error.data.code === status.CONFLICT.code) {
      res.status(409).send(response(status.CONFLICT, null));
    } else {
      console.error("미션 도전 추가 중 오류 발생:", error);
      res.status(500).send(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }
};

export const getMyMissions = async (req, res) => {
  try {
    const { cursor } = req.query;  // cursor를 쿼리 파라미터로
    const userId = req.user.id;    

    // 서비스 계층에 데이터 요청
    const { missions, nextCursor } = await MissionService.getMyMissions(userId, cursor);

    // 응답 데이터 구조화 (dto 대신)
    const formattedMissions = missions.map(mission => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      dueDate: mission.due_date,
      createdAt: mission.created_at
    }));

    // 성공 응답
    res.status(status.SUCCESS.status).send(response(status.SUCCESS, {
      missions: formattedMissions,
      nextCursor: nextCursor
    }));
  } catch (error) {
    // 오류 응답
    console.error("미션 목록 조회 중 오류 발생:", error);
    res.status(status.INTERNAL_SERVER_ERROR.status).send(
      response(status.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};

export const getStoreMissions = async (req, res) => {
  try {
    const { storeId } = req.params;  // storeId 가져오기
    const { cursor } = req.query;    // cursor 가져오기

    // 서비스 계층에 데이터 요청
    const { missions, nextCursor } = await MissionService.getStoreMissions(storeId, cursor);

    // 응답 데이터 구조화 (dto대신)
    const formattedMissions = missions.map(mission => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      dueDate: mission.due_date,
      createdAt: mission.created_at
    }));

    // 성공 응답
    res.status(status.SUCCESS.status).send(response(status.SUCCESS, {
      missions: formattedMissions,
      nextCursor: nextCursor
    }));
  } catch (error) {
    // 오류 응답
    console.error("미션 목록 조회 중 오류 발생:", error);
    res.status(status.INTERNAL_SERVER_ERROR.status).send(
      response(status.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};