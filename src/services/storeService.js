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
    return addStore(storeDTO);
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
    return newMission;
};