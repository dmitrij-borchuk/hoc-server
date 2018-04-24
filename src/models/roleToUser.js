import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('roleToUser', {
    role: Sequelize.INTEGER,
    user: Sequelize.INTEGER,
  });

  return Model;
};
