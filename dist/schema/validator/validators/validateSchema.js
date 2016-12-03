'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateSchema = validateSchema;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

function validateSchema(context, rules) {
  var path = '/';
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  }));
}