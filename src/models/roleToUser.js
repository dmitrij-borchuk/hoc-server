import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('roleToUser', {
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Model;
};
