// src/models/index.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,   // 데이터베이스 이름
  process.env.DB_USER,       // 데이터베이스 사용자 이름
  process.env.DB_PASSWORD,   // 데이터베이스 비밀번호
  {
    host: process.env.DB_HOST,  // 데이터베이스 호스트
    dialect: 'mysql',           // 사용하는 데이터베이스 종류
    port: process.env.DB_PORT,  // 데이터베이스 포트
    logging: false              // 콘솔에 SQL 로그 출력 여부
  }
);
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();  // 모델 동기화
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
