import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Mission from './mission.model.js';

const UserMission = sequelize.define('UserMission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  started_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'user_missions',
});

UserMission.belongsTo(Mission, { foreignKey: 'mission_id' });

export default UserMission;
