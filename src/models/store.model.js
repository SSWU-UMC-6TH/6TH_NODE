import { status } from "../../config/response.status.js";

let stores = [];
const reviews = [];
const missions = [];

export const addStore = ({ name, location, description }) => {
    const newStore = {
        id: stores.length + 1,
        name,
        location,
        description
    };
    stores.push(newStore);
    return newStore;
};

export const getStoreById = (id) => {
    return stores.find(store => store.id === parseInt(id));
};

export const getMissions = () => {
    return missions;
};

export const createStore = async (data) => {
    const storeDTO = new StoreDTO(data);
    const newStore = addStore(storeDTO);
    console.log("새로운 store가 추가되었습니다:", newStore);
};

export const createReview = async (storeId, rating, comment) => {
    const store = stores.find(store => store.id === parseInt(storeId));
    if (!store) {
        throw new BaseError({
            message: "Store not found",
            status: 404
        });
    }
    const newReview = {
        id: reviews.length + 1,
        storeId,
        rating,
        comment
    };
    reviews.push(newReview);
    console.log("새로운 review가 추가되었습니다:", newReview);
    return newReview;
};

// 새로운 미션 생성 함수 수정
export const createMission = async (storeId, missionDescription, reward) => {
    const store = stores.find(store => store.id === parseInt(storeId));
    if (!store) {
        throw new BaseError(status.NOT_FOUND, "Store not found");
    }
    const newMission = {
        id: missions.length + 1,
        storeId,
        description: missionDescription,
        reward,
        status: '진행 중' // 미션의 진행 상태 필드 추가
    };
    missions.push(newMission);
    console.log("새로운 미션이 추가되었습니다:", newMission);
    console.log("미션 추가 후 상태:", missions);
    return newMission;
};

// 미션 상태 변경 함수 추가
export const completeMission = async (missionId) => {
    const mission = missions.find(mission => mission.id === parseInt(missionId));
    if (!mission) {
        throw new BaseError(status.NOT_FOUND, "Mission not found");
    }
    mission.status = '완료'; // 미션의 진행 상태를 '완료'로 변경
    console.log("미션 완료 상태로 변경되었습니다:", mission);
    return mission;
};

export const getMissionsByStoreId = (storeId) => {
    return missions.filter(mission => mission.storeId === storeId);
};