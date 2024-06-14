import { createStore, createReview, createMission } from '../services/storeService.js';
import { status } from '../../config/response.status.js';
import { getStoreById, getMissionsByStoreId } from '../models/store.model.js';


export const addStore = async (req, res) => {
    try {
        const newStore = await createStore(req.body);
        res.status(201).json({
            message: "Store created successfully",
            store: newStore
        });
    } catch (error) {
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

export const reviewPreview = async(req,res,next)=>{
    return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)))
}

export const getMissionsForStore = async (req, res) => {
    const { storeId } = req.params;
    
    try {
        const store = getStoreById(parseInt(storeId));
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        
        const missions = getMissionsByStoreId(parseInt(storeId));
        res.status(200).json(missions);
    } catch (error) {
        console.error('Error retrieving missions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};