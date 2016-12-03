'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateExpressions = validateExpressions;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

function validateExpressions(expressions, context, parentPath, rules) {
  var path = parentPath + '/expression';
  var ruleSet = rules[path] || [];
  return (0, _jsutilsFlatten22['default'])(expressions.map(function (expression) {
    return (0, _jsutilsFlatten22['default'])(ruleSet.map(function (rule) {
      return rule(_extends({}, context, { expression: expression })) || [];
    }));
  }));
}