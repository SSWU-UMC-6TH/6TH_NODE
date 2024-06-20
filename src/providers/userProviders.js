//import { } from "http-status-codes";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {signinResponseDTO} from "../dtos/user.dto.js";
import {getUser, addUser, addMemberMission} from "../models/user.dao.js";

export const joinUser = async(body) => {
    const userData = {
        "email": body.email,
        "name": body.name,
        "gender": body.gender,
        "phone": body.phone,
        "status": "active",
        "inactive_date": null,
        "prefer": null
    }
    // register user's information in DB
    const joinUserData = await addUser(
      userData
        // 일단 null로 처리하고 다른 작업 진행
    );
    //fail to register the information in DB
    console.log(`joinUserData: ${joinUserData}`);
    if(joinUserData == -1) throw new BaseError(status.EMAIL_ALREADY_EXIST);

    return signinResponseDTO(await getUser(userData));
}

export const registerMemberMission= async(body) => {
    //해당 미션 정보를 member_mission에 등록

    const missionData ={
        "user_id": body.user_id,
        "mission_id": body.mission_id,
        "review_id": body.review_id,
        "status": body.status
    }

    const result = await addMemberMission(missionData);

    return result;
}