// src/models/mission.model.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Mission = sequelize.define('Mission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reward: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  mission_spec: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  store_id: {  // 필드 이름 수정
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'mission',  // 테이블 이름 명시
});

export default Mission;
