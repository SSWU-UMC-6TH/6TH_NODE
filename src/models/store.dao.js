import { db } from "../../index.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStore, insertMission } from "./store.sql.js";


export const addStore = async(data) => {
    const dbConnection = await db.getConnection();
    
    const result = await db.query(insertStore,[data.name, data.si, data.dong, data.bungi, data.info, data.number, db.now, db.now]);

    console.log(`result: {result}`);
    dbConnection.release();

    return result[0];

}

export const addMission = async(data) => {
    const dbConnection = await db.getConnection();
    const result = await db.query(insertMission,[data.store_id, data.name, data.success, data.point, data.description, db.now, db.now]);

    dbConnection.release();

    return result[0];

}