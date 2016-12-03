'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateArguments = validateArguments;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

function validateArguments(args, context, parentPath, rules) {
  var path = parentPath + '/argument';
  var ruleSet = rules[path] || [];
  return (0, _jsutilsFlatten22['default'])(args.map(function (argument) {
    return (0, _jsutilsFlatten22['default'])(ruleSet.map(function (rule) {
      return rule(_extends({}, context, { argument: argument })) || [];
    }));
  }));
}