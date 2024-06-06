// db.config.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 
async function checkDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('데이터베이스 연결 성공!');
        connection.release();  // 연결 성공 후, 연결을 풀에 반환
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
    }
}

checkDatabaseConnection();