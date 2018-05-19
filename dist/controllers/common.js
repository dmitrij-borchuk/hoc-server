'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _system = require('./system');

var _constants = require('../constants');

var _users = require('./users');

var _roles = require('./roles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// eslint-disable-next-line import/prefer-default-export
var init = exports.init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var initiated, user, adminRole;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _system.getByKey)(_constants.SYSTEM_KEYS.INITIATED);

          case 2:
            initiated = _context.sent;

            if (!parseInt(initiated.value, 10)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', _boom2.default.badRequest('App already initiated'));

          case 5:
            _context.next = 7;
            return (0, _users.createUser)({
              email: data.email,
              username: data.username,
              password: _passwordHash2.default.generate(data.password)
            });

          case 7:
            user = _context.sent;
            _context.next = 10;
            return (0, _roles.createRole)({
              name: _constants.ROLES.SYSTEM_ADMIN
            });

          case 10:
            adminRole = _context.sent;
            _context.next = 13;
            return user.addRole(adminRole);

          case 13:
            return _context.abrupt('return', (0, _system.set)({
              key: _constants.SYSTEM_KEYS.INITIATED,
              value: 1
            }));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();