const db = require('../../config/db.config');

class MissionDAO {
   static async createMission(missionDto) {
      const { store_id, reward, deadline, mission_spec } = missionDto;
      const [result] = await db.execute(
         'INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
         [store_id, reward, deadline, mission_spec]
      );
      return result.insertId;
   }

   static async findMissionById(mission_id) {
      const [rows] = await db.execute('SELECT * FROM mission WHERE id = ?', [mission_id]);
      return rows.length > 0 ? rows[0] : null;
   }

   static async findMemberMission(member_id, mission_id) {
      const [rows] = await db.execute(
         'SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ? AND status_id = 1',
         [member_id, mission_id]
      );
      return rows.length > 0 ? rows[0] : null;
   }

   static async createMemberMission(member_id, mission_id) {
      const [result] = await db.execute(
         'INSERT INTO member_mission (member_id, mission_id, status_id, created_at, updated_at) VALUES (?, ?, 1, NOW(), NOW())',
         [member_id, mission_id]
      );
      return result.insertId;
   }

   static async getMyMissions(userId, limit, cursor) {
   let query = `
      SELECT m.id, m.title, m.description, m.due_date, m.created_at
      FROM mission m
      INNER JOIN member_mission mm ON m.id = mm.mission_id
      WHERE mm.member_id = ?
   `;
   const params = [userId];

   if (cursor) {
      query += ' AND m.id < ?';
      params.push(cursor);
   }

   query += ' ORDER BY m.id DESC LIMIT ?';
   params.push(limit);

   const [rows] = await db.execute(query, params);
   return rows;
   }

   static async getStoreMissions(storeId, limit, cursor) {
      let query = `
         SELECT m.id, m.title, m.description, m.due_date, m.created_at
         FROM mission m
         WHERE m.store_id = ?
      `;
      const params = [storeId];

      if (cursor) {
         query += ' AND m.id < ?';
         params.push(cursor);
      }

      query += ' ORDER BY m.id DESC LIMIT ?';
      params.push(limit);

      const [rows] = await db.execute(query, params);
      return rows;
      }
}

module.exports = MissionDAO;

