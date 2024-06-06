// missionService.js
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

let missions = [];
let challenges = [];

export const challengeExistingMission = async (missionId) => {
    const mission = missions.find(m => m.id === parseInt(missionId));
    if (!mission) {
        throw new BaseError(status.NOT_FOUND, "Mission not found");
    }
    const alreadyChallenged = challenges.find(c => c.missionId === parseInt(missionId));
    if (alreadyChallenged) {
        return { error: "Mission already challenged" };
    }
    const newChallenge = {
        id: challenges.length + 1,
        missionId,
        status: "In Progress"
    };
    challenges.push(newChallenge);
    return newChallenge;
};

export const addMission = async (description, reward) => {
    const newMission = {
        id: missions.length + 1,
        description,
        reward
    };
    missions.push(newMission);
    return newMission;
};
