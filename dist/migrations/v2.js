'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _roles = require('../controllers/roles');

var _users = require('../controllers/users');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = [{ name: _constants.ROLES.SYSTEM_ADMIN }, { name: _constants.ROLES.ADMIN }, { name: _constants.ROLES.TEACHER }, { name: _constants.ROLES.MENTOR }];

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var createdRoles, admin;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all(_ramda2.default.map(_roles.create, data));

        case 2:
          createdRoles = _context.sent;
          _context.next = 5;
          return (0, _users.getByEmail)('admin@hour-of-code.com');

        case 5:
          admin = _context.sent;
          return _context.abrupt('return', (0, _roles.addRoleToUser)({
            user: admin.id,
            role: createdRoles[0].id
          }));

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));