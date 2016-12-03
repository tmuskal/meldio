'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateConditions = validateConditions;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateArguments = require('./validateArguments');

function validateConditions(conditions, context, parentPath, rules) {
  var path = parentPath + '/condition';
  var ruleSet = rules[path] || [];
  return (0, _jsutilsFlatten22['default'])(conditions.map(function (condition) {
    return (0, _jsutilsFlatten22['default'])(ruleSet.map(function (rule) {
      return rule(_extends({}, context, { condition: condition })) || [];
    })).concat((0, _validateArguments.validateArguments)(condition.arguments, _extends({}, context, { condition: condition }), path, rules));
  }));
}