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
}

module.exports = MissionDAO;

