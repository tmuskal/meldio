'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateInput = validateInput;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateArguments = require('./validateArguments');

function validateInput(input, parentContext, rules) {
  var path = '/input';
  var context = _extends({}, parentContext, { input: input });
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  })).concat((0, _validateArguments.validateArguments)(input.arguments, context, path, rules));
}