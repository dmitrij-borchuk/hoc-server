'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _users = require('../controllers/users');

var _roles = require('../controllers/roles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (server) {
  var BASE_PATH = '/api';

  // POST login
  server.route({
    method: 'POST',
    path: BASE_PATH + '/users/login',
    options: {
      validate: {
        payload: {
          password: _joi2.default.string().required(),
          email: _joi2.default.string().email().required()
        }
      },
      auth: false
    },
    handler: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
        var data, user, passwordsMatched, roles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = req.payload;
                _context.next = 3;
                return (0, _users.getByEmail)(data.email);

              case 3:
                user = _context.sent;

                if (!user) {
                  _context.next = 12;
                  break;
                }

                passwordsMatched = _passwordHash2.default.verify(data.password, user.password);

                if (!passwordsMatched) {
                  _context.next = 11;
                  break;
                }

                _context.next = 9;
                return (0, _roles.getUserRoles)(user.id);

              case 9:
                roles = _context.sent;
                return _context.abrupt('return', _jsonwebtoken2.default.sign(_extends({}, user.toJSON(), {
                  roles: _ramda2.default.pluck('name', roles)
                }), process.env.JWT_SECRET));

              case 11:
                return _context.abrupt('return', _boom2.default.unauthorized());

              case 12:
                return _context.abrupt('return', _boom2.default.unauthorized());

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function handler(_x) {
        return _ref.apply(this, arguments);
      }

      return handler;
    }()
  });

  // GET users
  server.route({
    method: 'GET',
    path: BASE_PATH + '/users',
    handler: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', (0, _users.getAll)());

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function handler() {
        return _ref2.apply(this, arguments);
      }

      return handler;
    }()
  });
};