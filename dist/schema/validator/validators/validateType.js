'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateType = validateType;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateDirectives = require('./validateDirectives');

var _validateFields = require('./validateFields');

function validateType(type, parentContext, rules) {
  var path = '/type';
  var context = _extends({}, parentContext, { type: type });
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  })).concat((0, _validateDirectives.validateDirectives)(type.directives, context, path, rules)).concat((0, _validateFields.validateFields)(type.fields, context, path, rules));
}