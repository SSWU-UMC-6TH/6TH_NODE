import { createStore, createReview, createMission } from '../services/storeService.js';

export const addStore = async (req, res) => {
    console.log("addstore문");
    try {
        console.log("addstore try문");
        const newStore = await createStore(req.body);
        res.status(201).json({
            message: "Store created successfully",
            store: newStore
        });
    } catch (error) {
        console.log("addstore catch문");
        res.status(400).json({ message: error.message });
    }
};
export const addReviewToStore = async (req, res) => {
    const { storeId } = req.params;
    const { rating, comment } = req.body;
    const result = createReview(storeId, rating, comment);
    res.status(201).json(result);
};

export const addMissionToStore = async (req, res) => {
    const { storeId } = req.params;
    const { missionDescription, reward } = req.body;
    const result = createMission(storeId, missionDescription, reward);
    res.status(201).json(result);
};