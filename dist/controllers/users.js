'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.createUser = exports.getByEmail = exports.getUserById = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _db = require('../utils/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserById = exports.getUserById = _ramda2.default.bind(_db.UserModel.findById, _db.UserModel);
// import passwordHash from 'password-hash';
var getByEmail = exports.getByEmail = _ramda2.default.pipe(function (email) {
  return { where: { email: email } };
}, _ramda2.default.bind(_db.UserModel.findOne, _db.UserModel));

var createUser = exports.createUser = function createUser(data) {
  return _db.UserModel.create(data);
};

var getAll = exports.getAll = _ramda2.default.pipe(_ramda2.default.bind(_db.UserModel.findAll, _db.UserModel));