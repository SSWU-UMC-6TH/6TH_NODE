// temp.service.js

import { BaseError } from "../../config/error.js";
import { tempResponseDTO } from "../dtos/temp.response.dto.js";
import { flagResponseDTO } from "../dtos/temp.response.dto.js";
import { status } from "../../config/response.status.js";


export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}//get은 주로 provider(read로직 관련)에 작성

export function CheckFlag(flag){
   if(flag == 1)
       throw new BaseErrorError(status.BAD_REQUEST);   // 에러 발생시키기!
   else{
       return flagResponseDTO(flag);
   }
}