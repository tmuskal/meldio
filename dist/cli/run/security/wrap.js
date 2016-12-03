"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var wrap = function wrap(fn) {
  return function (req, res, next) {
    return fn(req, res, next)["catch"](next);
  };
};
exports["default"] = wrap;
module.exports = exports["default"];