'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _db = require('./utils/db');

var _db2 = _interopRequireDefault(_db);

var _system = require('./controllers/system');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _migrations = require('./migrations');

var _migrations2 = _interopRequireDefault(_migrations);

var _common = require('./controllers/common');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// set env variables from `.env` file
_dotenv2.default.config();

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var DB_VERSION_KEY, server, dbVersion, newVersion;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          DB_VERSION_KEY = 'dbversion';
          _context.prev = 1;

          // Create a server with a host and port
          server = _hapi2.default.server({
            host: 'localhost',
            port: 8000
          });
          _context.next = 5;
          return (0, _auth2.default)(server);

        case 5:

          // Add the route
          (0, _routes2.default)(server);

          _context.next = 8;
          return _db2.default.sync();

        case 8:
          _context.next = 10;
          return (0, _system.getByKey)(DB_VERSION_KEY);

        case 10:
          dbVersion = _context.sent;

          if (dbVersion) {
            _context.next = 17;
            break;
          }

          _context.next = 14;
          return (0, _system.set)({
            key: DB_VERSION_KEY,
            value: '0'
          });

        case 14:
          _context.next = 16;
          return (0, _system.getByKey)(DB_VERSION_KEY);

        case 16:
          dbVersion = _context.sent;

        case 17:
          _context.prev = 17;
          _context.next = 20;
          return (0, _migrations2.default)(dbVersion.value);

        case 20:
          newVersion = _context.sent;
          _context.next = 23;
          return (0, _system.set)({
            key: DB_VERSION_KEY,
            value: '' + newVersion
          });

        case 23:
          _context.next = 30;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context['catch'](17);

          console.error('    Error while migration');
          console.error('    ' + _context.t0.message);
          throw _context.t0;

        case 30:

          (0, _common.init)({
            email: process.env.ADMIN,
            username: _constants.FIRST_ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
          });

          // Start the server
          _context.next = 33;
          return server.start();

        case 33:
          console.log('Server running at:', server.info.uri);

          return _context.abrupt('return', server);

        case 37:
          _context.prev = 37;
          _context.t1 = _context['catch'](1);

          console.error(_context.t1);
          return _context.abrupt('return', process.exit(1));

        case 41:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[1, 37], [17, 25]]);
}));