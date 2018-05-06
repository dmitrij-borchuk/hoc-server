import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('system', {
    key: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Model;
};
