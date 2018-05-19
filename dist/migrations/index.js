'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('./v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var migrations = [_v2.default];

// ([Function], Number) -> Number
var runMigration = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arr, v) {
    var f;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            f = arr[v];

            if (!f) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return f();

          case 4:
            return _context.abrupt('return', runMigration(arr, v + 1));

          case 5:
            return _context.abrupt('return', v);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function runMigration(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fromVersion) {
    var v;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            v = parseInt(fromVersion, 10);
            return _context2.abrupt('return', runMigration(migrations, v));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();