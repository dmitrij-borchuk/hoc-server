import Sequelize from 'sequelize';
import R from 'ramda';

const USERNAME = 'username';
const PASSWORD = 'password';

const sequelize = new Sequelize('database', USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // SQLite only
  storage: 'db/database.sqlite',
});

export const UserModel = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
export const SystemModel = sequelize.define('system', {
  key: Sequelize.STRING,
  value: Sequelize.STRING,
});

export const syncModels = R.bind(sequelize.sync, sequelize);

export default sequelize;
