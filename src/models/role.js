import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('role', {
    name: Sequelize.STRING,
  });

  return Model;
};
