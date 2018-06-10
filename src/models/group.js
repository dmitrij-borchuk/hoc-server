import Sequelize from 'sequelize';

export default sequelize => sequelize.define('group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  // Note: venueId - foreign key
});
