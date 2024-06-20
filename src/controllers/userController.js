import {response} from "../../config/response.js";
import { status } from "../../config/response.status.js";


import {joinUser, registerMemberMission} from "../providers/userProviders.js";


export const userSignin = async(req,res,next) => {
    console.log("회원가입 요청");
    console.log("body:", req.body);
    res.send(response(status.SUCCESS, await joinUser(req.body)));
    
}

export const getMission = async(req,res,next) => {

    res.send(response(status.SUCCESS, await registerMemberMission(req.body)));
}