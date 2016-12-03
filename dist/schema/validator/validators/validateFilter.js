'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateFilter = validateFilter;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateConditions = require('./validateConditions');

function validateFilter(filter, parentContext, rules) {
  var path = '/filter';
  var context = _extends({}, parentContext, { filter: filter });
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  })).concat((0, _validateConditions.validateConditions)(filter.conditions, context, path, rules));
}