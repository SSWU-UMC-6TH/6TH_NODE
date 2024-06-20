import express from "express";
import {registerStore, registerMission} from "../controllers/storeController.js"
export const storeRouter = express.Router();

storeRouter.post("/register", registerStore);
storeRouter.post("/register/mission", registerMission);