import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO } from "../dtos/user.dto.js"
import { addUser, getUser, getUserPreferToUserID, setPrefer } from "../models/user.dao.js";

export const joinUser = async (body) => {
    try {
        const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
        const prefer = body.prefer;

        const joinUserData = await addUser({
            'email': body.email,
            'name': body.name,
            'gender': body.gender,
            'birth': birth,
            'addr': body.addr,
            'specAddr': body.specAddr,
            'phone': body.phone
        });

        if (joinUserData === false) {
            throw new BaseError(status.EMAIL_ALREADY_EXIST);
        } else {
            for (let i = 0; i < prefer.length; i++) {
                await setPrefer(joinUserData, prefer[i]);
            }
            return { isSuccess: true, result: signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData)) };
        }
    } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        return { isSuccess: false, message: "회원가입 중 오류 발생" };
    }
};