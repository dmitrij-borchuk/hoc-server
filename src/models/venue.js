import Sequelize from 'sequelize';

export default sequelize => sequelize.define('venue', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
