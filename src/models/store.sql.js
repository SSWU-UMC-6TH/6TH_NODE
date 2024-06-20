export const insertStore = "insert into store(name,si,dong,bungi,info,number,createdAt, updatedAt) values(?,?,?,?,?,?,?,?);";

export const insertMission = "insert into mission(store_id, name, success, point, description, createdAt, updatedAt) values(?,?,?,?,?,?,?);";
 