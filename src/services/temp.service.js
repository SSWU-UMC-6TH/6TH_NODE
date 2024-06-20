import { tempResponseDTO } from "../dtos/tempResponse.dto.js";
import { flagResponseDTO } from "../dtos/tempResponse.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}
//error 
export function CheckFlag(flag){
    if(flag == 1)
        throw new BaseError(status.BAD_REQUEST);   // 에러 발생시키기!
    else{
        return flagResponseDTO(flag);
    }
}