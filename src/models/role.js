import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('role', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Model;
};
