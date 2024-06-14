import { challengeExistingMission } from "../services/missionService.js";
import { getMissions } from '../models/store.model.js';

export const challengeMission = async (req,res) =>{
    const {missionId} = req.params;
    const result = challengeExistingMission(missionId);
    if(result.error){
        res.status(409).json({message: "This mission is already being challenged."});
    } else {
        res.status(201).json(result);
    }
    
};

export const getMissionsByStoreId = (req, res) => {
    try {
        const { storeId } = req.params;
        const { page } = req.query; // 페이지 번호 가져오기
        const pageSize = 10; // 페이지당 미션 개수 설정 (예시)
        
        // 예시: mission.model.js에서 상점(store)에 대한 미션을 가져오도록 수정
        const storeMissions = getMissions().filter(mission => mission.storeId === parseInt(storeId));

        // 페이지네이션 처리
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedMissions = storeMissions.slice(startIndex, endIndex);

        if (paginatedMissions.length === 0) {
            return res.status(404).json({ message: 'No missions found for this store' });
        }
        res.status(200).json(paginatedMissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

