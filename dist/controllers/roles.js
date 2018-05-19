'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRoles = exports.createRole = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _db = require('../utils/db');

var _users = require('./users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createRole = exports.createRole = _ramda2.default.bind(_db.RoleModel.create, _db.RoleModel);

var getUserRoles = exports.getUserRoles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _users.getUserById)(id);

          case 2:
            user = _context.sent;
            return _context.abrupt('return', user.getRoles());

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getUserRoles(_x) {
    return _ref.apply(this, arguments);
  };
}();