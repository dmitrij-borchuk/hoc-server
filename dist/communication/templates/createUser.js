"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return "New user was just created for the email \"" + data.email + "\". Your token for creating password is \"" + data.token + "\"";
};