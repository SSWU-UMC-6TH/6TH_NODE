import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {tempResponseDTO,flagResponseDTO} from "../dtos/tempResponse.dto.js";
export const getTempData = () => {
    return tempResponseDTO("Testing now");  
};
export const CheckFlag = (flag) =>{
    if(flag == 1){
       // throw new BaseError(status.BAD_REQUEST);
       throw new BaseError(status.BAD_REQUEST);
     
    }
        
    else{
        return flagResponseDTO(flag);
    }
};