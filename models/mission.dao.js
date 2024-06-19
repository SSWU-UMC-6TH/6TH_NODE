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

export const getMissionsByStoreId = async (storeId, limit, offset) => {
   if (storeId === undefined || limit === undefined || offset === undefined) {
      throw new Error("Missing required fields");
   }
   const query = `
         SELECT id as missionId, reward, deadline, mission_spec, created_at as createdAt, updated_at as updatedAt
         FROM mission
         WHERE store_id = ?
         ORDER BY id DESC
         LIMIT ${parseInt(limit, 10)}
         OFFSET ${parseInt(offset, 10)}
      `;
   console.log("Executing query with params:", storeId, limit, offset);
   const [rows] = await pool.execute(query, [storeId]);
   console.log("Query result:", rows);
   return rows;
};

export const getTotalMissionsCountByStore = async (storeId) => {
   const query = `
         SELECT COUNT(*) as total
         FROM mission
         WHERE store_id = ?
      `;
   const [rows] = await pool.execute(query, [storeId]);
   return rows[0].total;
};

export const getOngoingMissionsByMemberId = async (memberId, limit, offset) => {
   if (memberId === undefined || limit === undefined || offset === undefined) {
      throw new Error("Missing required fields");
   }
   const limitInt = parseInt(limit, 10);
   const offsetInt = parseInt(offset, 10);

   const query = `
         SELECT m.id as missionId, m.reward, m.deadline, m.mission_spec, m.created_at as createdAt, m.updated_at as updatedAt
         FROM mission m
         JOIN member_mission mm ON m.id = mm.mission_id
         WHERE mm.member_id = ? AND mm.status_id = 1
         ORDER BY m.id DESC
         LIMIT ${limitInt}
         OFFSET ${offsetInt}
      `;
   console.log("Executing query with params:", memberId, limitInt, offsetInt);
   const [rows] = await pool.execute(query, [memberId]);
   console.log("Query result:", rows);
   return rows;
   };

   export const getTotalOngoingMissionsCountByMemberId = async (memberId) => {
   const query = `
         SELECT COUNT(*) as total
         FROM mission m
         JOIN member_mission mm ON m.id = mm.mission_id
         WHERE mm.member_id = ? AND mm.status_id = 1
      `;
   const [rows] = await pool.execute(query, [memberId]);
   return rows[0].total;
   };