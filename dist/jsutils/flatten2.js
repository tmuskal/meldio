

/* flattens one level deep - defined so purely due to some flow weirdness */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flatten;

function flatten(xs) {
  var result = [];
  for (var i = 0; i < xs.length; i++) {
    if (Array.isArray(xs[i])) {
      result = result.concat(xs[i]);
    } else {
      result.push(xs[i]);
    }
  }
  return result;
}

module.exports = exports["default"];