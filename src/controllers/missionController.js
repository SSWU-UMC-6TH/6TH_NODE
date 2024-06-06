import { challengeExistingMission } from '../services/missionService.js';

export const challengeMission = async (req, res) => {
    const { missionId } = req.params;
    const result = challengeExistingMission(missionId);
    if (result.error) {
        res.status(409).json({ message: "This mission is already being challenged." });
    } else {
        res.status(201).json(result);
    }
};