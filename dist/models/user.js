'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize) {
  var Model = sequelize.define('user', {
    username: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    email: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      unique: true
    },
    password: _sequelize2.default.STRING,
    resetToken: _sequelize2.default.STRING
  });
  Model.prototype.toJSON = function toJSON() {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return Model;
};