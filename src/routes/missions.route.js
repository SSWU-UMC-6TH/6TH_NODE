import express from "express";
import { addMission, addMissionChallenge } from "../controllers/missions.controller.js";

export const missionRouter = express.Router();

missionRouter.post('/', addMission);
missionRouter.post('/challenge', addMissionChallenge);

