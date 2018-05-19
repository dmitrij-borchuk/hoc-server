'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerHapi = require('apollo-server-hapi');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _common = require('../controllers/common');

var _gql = require('../gql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(server) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _users2.default)(server);

            _context3.next = 3;
            return server.register({
              plugin: _apolloServerHapi.graphqlHapi,
              options: {
                path: '/api/graphql',
                graphqlOptions: function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            return _context.abrupt('return', {
                              schema: _gql.schema,
                              context: request
                            });

                          case 1:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, undefined);
                  }));

                  function graphqlOptions(_x2) {
                    return _ref2.apply(this, arguments);
                  }

                  return graphqlOptions;
                }(),
                route: {
                  cors: true
                }
              }
            });

          case 3:
            _context3.next = 5;
            return server.register({
              plugin: _apolloServerHapi.graphiqlHapi,
              options: {
                path: '/graphiql',
                graphiqlOptions: {
                  endpointURL: '/api/graphql'
                },
                route: {
                  cors: true,
                  auth: false
                }
              }
            });

          case 5:

            server.route({
              method: 'GET',
              path: '/hello',
              handler: function handler() {
                return 'hello world';
              },
              config: {
                auth: false
              }
            });

            server.route({
              method: 'POST',
              path: '/api/init',
              options: {
                validate: {
                  payload: {
                    email: _joi2.default.string().email().required(),
                    username: _joi2.default.string().required()
                  }
                },
                auth: false
              },
              handler: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          _context2.next = 3;
                          return (0, _common.init)(req.payload);

                        case 3:
                          return _context2.abrupt('return', true);

                        case 6:
                          _context2.prev = 6;
                          _context2.t0 = _context2['catch'](0);

                          console.error(_context2.t0);
                          throw _context2.t0;

                        case 10:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined, [[0, 6]]);
                }));

                function handler(_x3) {
                  return _ref3.apply(this, arguments);
                }

                return handler;
              }()
            });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();