'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter key "', '" of filter on ', ' contains an undefined\n          ~ variable "', '". All variables used in filter expression\n          ~ must be defined. ', ''], ['Filter key "', '" of filter on ', ' contains an undefined\n          ~ variable "', '". All variables used in filter expression\n          ~ must be defined. ', '']);

var _jsutilsKeyMap = require('../../../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var NoUndefinedVariables = function NoUndefinedVariables(_ref) {
  var filter = _ref.filter;
  var condition = _ref.condition;

  if (!filter || !condition) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;

  var target = name.replace('Filter#', '');
  var key = condition.key;
  var argsList = condition.arguments;
  var conditionAST = condition.conditionAST;
  var loc = condition.loc;

  var variables = (0, _analyzer.extractVariablesFromObjectValues)([conditionAST]);
  var args = (0, _jsutilsKeyMap2['default'])(argsList, function (arg) {
    return arg.name;
  });

  return variables.filter(function (variable) {
    return !args[variable];
  }).map(function (variable) {
    return (0, _utils.error)(_templateObject, key, target, variable, loc);
  });
};
exports.NoUndefinedVariables = NoUndefinedVariables;