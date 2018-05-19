'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize) {
  var Model = sequelize.define('system', {
    key: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: _sequelize2.default.STRING,
      allowNull: false
    }
  });

  return Model;
};