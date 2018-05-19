'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.getByKey = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _db = require('../utils/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getByKey = exports.getByKey = _ramda2.default.pipe(function (key) {
  return { where: { key: key } };
}, _ramda2.default.bind(_db.SystemModel.findOne, _db.SystemModel));

var set = exports.set = _ramda2.default.curry(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model, data) {
    var instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return model.findOne({ where: { key: data.key } });

          case 2:
            instance = _context.sent;

            if (!instance) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', instance.update(data));

          case 5:
            return _context.abrupt('return', model.create(data));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())(_db.SystemModel);