import UserMission from '../models/userMission.model.js';
import Mission from '../models/mission.model.js';

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
export const completeUserMission = async (req, res) => {
    const userId = req.params.userId;
    const missionId = req.params.missionId;
  
    try {
      const userMission = await UserMission.findOne({
        where: { user_id: userId, mission_id: missionId, status: 'in_progress' }
      });
  
      if (!userMission) {
        return res.status(404).send({ message: 'Mission not found or already completed.' });
      }
  
      userMission.status = 'completed';
      await userMission.save();
  
      res.status(200).send({ message: 'Mission marked as completed.' });
    } catch (error) {
      console.error('Error completing mission:', error);
      res.status(500).send({ message: 'Error completing mission.' });
    }
  };