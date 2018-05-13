import Sequelize from 'sequelize';
import roleModelCreator from '../models/role';
import userModelCreator from '../models/user';
import systemModelCreator from '../models/system';

// TODO: remove from sourecede
const USERNAME = 'username';
const PASSWORD = 'password';

const sequelize = new Sequelize('database', USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',

  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // SQLite only
  storage: 'db/database.sqlite',
});

export const UserModel = userModelCreator(sequelize);
export const SystemModel = systemModelCreator(sequelize);
export const RoleModel = roleModelCreator(sequelize);

RoleModel.belongsToMany(UserModel, { as: 'users', through: 'releUsers' });
UserModel.belongsToMany(RoleModel, { as: 'roles', through: 'userRoles' });

export default sequelize;
