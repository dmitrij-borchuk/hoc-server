import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: Sequelize.STRING,
    resetToken: Sequelize.STRING,
  });
  Model.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return Model;
};
