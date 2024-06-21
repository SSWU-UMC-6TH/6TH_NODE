import Sequelize from 'sequelize';
const sequelize = new Sequelize('postgres://username:password@localhost:5432/database');

const Store = sequelize.define('Store', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  review: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

export default Store;