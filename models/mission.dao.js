import { pool } from "../config/db.config.js";

export const addMission = async (missionData) => {
   const { reward, storeId, deadline, mission_spec } = missionData;
   if (reward === undefined || storeId === undefined || deadline === undefined || mission_spec === undefined) {
      throw new Error('Missing required fields');
  }
   const query = `
      INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
   `;
   const [result] = await pool.execute(query, [storeId, reward,  deadline, mission_spec]);
   return result.insertId;
};
//이미 미션이 도전중인지 확인
export const findMissionByMemberAndMissionId = async (memberId, missionId) => {
   const query = `
       SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ?
   `;
   const [rows] = await pool.execute(query, [memberId, missionId]);
   return rows[0];
};
//도전중인 미션에 추가
export const addMemberMission = async (missionData) => {
   const { memberId, missionId, statusId } = missionData;
   const query = `
       INSERT INTO member_mission (member_id, mission_id, status_id, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW())
   `;
   const [result] = await pool.execute(query, [memberId, missionId, statusId]);
   return result.insertId;
};