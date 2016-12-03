"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flatten;

function flatten(xs) {
  var result = [];
  for (var i = 0; i < xs.length; i++) {
    if (Array.isArray(xs[i])) {
      result = result.concat(flatten(xs[i]));
    } else {
      result.push(xs[i]);
    }
  }
  return result;
}

module.exports = exports["default"];