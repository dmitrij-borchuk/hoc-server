'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapiAuthJwt = require('hapi-auth-jwt2');

var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _users = require('./controllers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(decoded) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _users.getUserById)(decoded.id);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', { isValid: false });

          case 5:
            return _context.abrupt('return', { isValid: true });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function validate(_x) {
    return _ref.apply(this, arguments);
  };
}();

var registerAuth = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(validateFunc, server) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return server.register(_hapiAuthJwt2.default);

          case 2:
            server.auth.strategy('jwt', 'jwt', {
              key: process.env.JWT_SECRET,
              validate: validateFunc,
              verifyOptions: {
                // only allow HS256 algorithm
                algorithms: ['HS256']
              },
              urlKey: 'token'
            });
            server.auth.default('jwt');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function registerAuth(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _ramda2.default.curry(registerAuth)(validate);