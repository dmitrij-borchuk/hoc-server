import Sequelize from 'sequelize';
import roleModelCreator from '../models/role';
import userModelCreator from '../models/user';
import systemModelCreator from '../models/system';
import roleToUserModelCreator from '../models/roleToUser';

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

export const UserModel = userModelCreator(sequelize);
export const SystemModel = systemModelCreator(sequelize);
export const RoleModel = roleModelCreator(sequelize);
export const RoleToUserModel = roleToUserModelCreator(sequelize);

export default sequelize;
