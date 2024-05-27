import { status } from "../../config/response.status.js";
import { tempResponseDTO, flagResponseDTO } from "../dtos/temp.response.dto.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}