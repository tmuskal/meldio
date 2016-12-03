/* TODO: remove lodash dependency */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.camelCase = camelCase;
exports.sentenceCase = sentenceCase;
exports.capitalCase = capitalCase;

var _lodash = require('lodash');

function camelCase(str) {
  return (0, _lodash.camelCase)(str);
}

function sentenceCase(str) {
  return (0, _lodash.capitalize)(camelCase(str));
}

function capitalCase(str) {
  return (0, _lodash.snakeCase)(str).toUpperCase();
}