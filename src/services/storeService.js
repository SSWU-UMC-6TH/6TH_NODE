import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStore, getStoreById } from '../models/store.model.js';
import { StoreDTO } from '../dtos/storeDto.js';

// 데이터베이스 대신 사용할 간단한 메모리 기반 저장소
let stores = [];
const reviews = [];
const missions = [];

export const createStore = async (data) => {
    const storeDTO = new StoreDTO(data);
    const newStore = addStore(storeDTO);  // 가정: addStore 함수가 storeDTO를 stores 배열에 추가하고 새 store를 반환합니다.
    stores.push(newStore);  // 새로운 store를 stores 배열에 추가합니다.
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

export const createMission = async (storeId, missionDescription, reward) => {
    const store = stores.find(store => store.id === parseInt(storeId));
    if (!store) {
        throw new BaseError(status.NOT_FOUND, "Store not found");
    }
    const newMission = {
        id: missions.length + 1,
        storeId,
        description: missionDescription,
        reward
    };
    missions.push(newMission);
    console.log("새로운 미션이 추가되었습니다:", newMission);
    console.log("미션 추가 후 상태:", missions); // 미션 추가 후 상태 로그
    return newMission;
};

export const getMissions = () => {
    return missions;
};