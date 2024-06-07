import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {getMissions} from "../services/storeService.js";

let challenges =[];

export const challengeExistingMission =async(missionId)=>{
    const missions = getMissions(); 
    console.log("미션 ID:", missionId); // missionId 로그
    console.log("현재 도전중인 미션들:", missions); // missions 배열 로그
    const mission = missions.find(m=>m.id === parseInt(missionId));
    console.log(missionId);
    if(!mission){
        throw new BaseError(status.NOT_FOUND, "Mission not found");
    }
    const alreadyChallenged = challenges.find(c=>c.missionId === parseInt(missionId));
    if(alreadyChallenged){
        return {error: "Mission already challenged"};
    }
    const newChallenge = {
        id: challenges. length + 1,
        missionId,
        status: "In Progress"
    };
    challenges.push(newChallenge);
    console.log("미션 도전!:", newChallenge);
    return newChallenge;
};

export const addMission= async(description, reward)=>{
    const newMission = {
        id: missions.length+1,
        description,
        reward
    };
    missions.push(newMission);
    return newMission;
}
