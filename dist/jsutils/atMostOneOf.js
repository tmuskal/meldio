"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = atMostOneOf;

function atMostOneOf() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (a) {
    return Boolean(a);
  }).length <= 1;
}

module.exports = exports["default"];