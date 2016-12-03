

/**
 * Turns a JS object into a list of its values. Same as Object.values in ES7,
 * currently unsupported by Flow.
 */

"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = values;

function values(object) {
  return _Object$keys(object).map(function (key) {
    return object[key];
  });
}

module.exports = exports["default"];