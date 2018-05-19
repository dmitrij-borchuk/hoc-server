'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _roles = require('../controllers/roles');

var _users = require('../controllers/users');

var _constants = require('../constants');

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [{ name: _constants.ROLES.SYSTEM_ADMIN }, { name: _constants.ROLES.ADMIN }, { name: _constants.ROLES.TEACHER }, { name: _constants.ROLES.MENTOR }];

exports.default = function () {
  // const createdRoles = await Promise.all(R.map(createRole, data));
  // const admin = await getByEmail('admin@hour-of-code.com');

  // return addRoleToUser({
  //   user: admin.id,
  //   role: createdRoles[0].id,
  // });
  return _db2.default.query('');
};