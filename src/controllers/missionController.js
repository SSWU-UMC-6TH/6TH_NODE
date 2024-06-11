import { challengeExistingMission } from '../services/missionService.js';
import Mission from '../models/mission.model.js';

export const challengeMission = async (req, res) => {
    const { missionId } = req.params;
    const result = challengeExistingMission(missionId);
    if (result.error) {
        res.status(409).json({ message: "This mission is already being challenged." });
    } else {
        res.status(201).json(result);
    }
};
export const getStoreMissions = async (req, res) => {
    const { storeId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    try {
      const { count, rows } = await Mission.findAndCountAll({
        where: { store_id: storeId }, 
        offset: (page - 1) * pageSize,
        limit: pageSize
      });
      console.log('Count:', count);
      console.log('Rows:', rows);
  
      res.status(200).json({
        totalItems: count,
        missions: rows,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page
      });
    } catch (error) {
        console.error('Error retrieving missions:', error);  // 오류 로그 추가
        res.status(500).send({ message: 'Error retrieving missions for store.' });
      }
    };

    export const getUserMissions = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const { count, rows } = await UserMission.findAndCountAll({
      where: { user_id: userId, status: 'in_progress' },
      include: [{ model: Mission }],
      offset: (page - 1) * pageSize,
      limit: pageSize
    });

    res.status(200).json({
      totalItems: count,
      userMissions: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page
    });
  } catch (error) {
    console.error('Error retrieving user missions:', error);
    res.status(500).send({ message: 'Error retrieving user missions.' });
  }
};