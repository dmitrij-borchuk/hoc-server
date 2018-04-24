import Sequelize from 'sequelize';

export default (sequelize) => {
  const Model = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  Model.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return Model;
};
