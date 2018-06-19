import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import roleModelCreator from '../models/role';
import userModelCreator from '../models/user';
import systemModelCreator from '../models/system';
import venueModelCreator from '../models/venue';
import groupModelCreator from '../models/group';
import { ENVIRONMENT } from '../constants';

// set env variables from `.env` file
dotenv.config();

// TODO: remove from sourecede
const USERNAME = 'username';
const PASSWORD = 'password';

const sequelizeOptions = {
  host: 'localhost',
  dialect: 'sqlite',

  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
if (process.env.environment !== ENVIRONMENT.DEVELOP) {
  // SQLite only
  sequelizeOptions.storage = 'db/database.sqlite';
}

const sequelize = new Sequelize('database', USERNAME, PASSWORD, sequelizeOptions);

export const UserModel = userModelCreator(sequelize);
export const SystemModel = systemModelCreator(sequelize);
export const RoleModel = roleModelCreator(sequelize);
export const VenueModel = venueModelCreator(sequelize);
export const GroupModel = groupModelCreator(sequelize);

RoleModel.belongsToMany(UserModel, { as: 'users', through: 'releUsers' });
UserModel.belongsToMany(RoleModel, { as: 'roles', through: 'userRoles' });
GroupModel.belongsTo(VenueModel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
GroupModel.belongsTo(UserModel, {
  foreignKey: 'assignee',
  as: 'assigneeFull',
});
VenueModel.hasMany(GroupModel);

export default sequelize;
