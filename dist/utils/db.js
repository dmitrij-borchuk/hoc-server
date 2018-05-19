'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModel = exports.SystemModel = exports.UserModel = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _role = require('../models/role');

var _role2 = _interopRequireDefault(_role);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _system = require('../models/system');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove from sourecede
var USERNAME = 'username';
var PASSWORD = 'password';

var sequelize = new _sequelize2.default('database', USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',

  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'db/database.sqlite'
});

var UserModel = exports.UserModel = (0, _user2.default)(sequelize);
var SystemModel = exports.SystemModel = (0, _system2.default)(sequelize);
var RoleModel = exports.RoleModel = (0, _role2.default)(sequelize);

RoleModel.belongsToMany(UserModel, { as: 'users', through: 'releUsers' });
UserModel.belongsToMany(RoleModel, { as: 'roles', through: 'userRoles' });

exports.default = sequelize;