'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateMutation = validateMutation;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateDirectives = require('./validateDirectives');

var _validateArguments = require('./validateArguments');

var _validateFields = require('./validateFields');

function validateMutation(mutation, parentContext, rules) {
  var path = '/mutation';
  var context = _extends({}, parentContext, { mutation: mutation });
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  })).concat((0, _validateDirectives.validateDirectives)(mutation.directives, context, path, rules)).concat((0, _validateArguments.validateArguments)(mutation.arguments, context, path, rules)).concat((0, _validateFields.validateFields)(mutation.fields, context, path, rules));
}