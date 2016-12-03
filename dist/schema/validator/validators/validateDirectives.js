'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateDirectives = validateDirectives;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

function validateDirectives(directives, context, parentPath, rules) {
  var path = parentPath + '/directive';
  var ruleSet = rules[path] || [];
  return (0, _jsutilsFlatten22['default'])(directives.map(function (directive) {
    return (0, _jsutilsFlatten22['default'])(ruleSet.map(function (rule) {
      return rule(_extends({}, context, { directive: directive })) || [];
    }));
  }));
}