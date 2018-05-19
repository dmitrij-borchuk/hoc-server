'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = undefined;

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/prefer-default-export
var createToken = exports.createToken = function createToken() {
  return _randToken2.default.generate(16);
};