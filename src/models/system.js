import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('system', {
    key: Sequelize.STRING,
    value: Sequelize.STRING,
  });

  return Model;
};
