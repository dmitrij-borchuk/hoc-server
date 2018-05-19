'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('../controllers/system');

var _constants = require('../constants');

exports.default = function () {
  return (0, _system.set)({
    key: _constants.SYSTEM_KEYS.INITIATED,
    value: 0
  });
};