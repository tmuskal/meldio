'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter key "', '" of filter on ', ' contains an unused\n          ~ argument "', '". All arguments defined for a filter key\n          ~ must be referenced by variables within expression. ', ''], ['Filter key "', '" of filter on ', ' contains an unused\n          ~ argument "', '". All arguments defined for a filter key\n          ~ must be referenced by variables within expression. ', '']);

var _jsutilsKeyMap = require('../../../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var NoUnusedArguments = function NoUnusedArguments(_ref) {
  var filter = _ref.filter;
  var condition = _ref.condition;

  if (!filter || !condition) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;

  var target = name.replace('Filter#', '');
  var key = condition.key;
  var args = condition.arguments;
  var conditionAST = condition.conditionAST;
  var loc = condition.loc;

  var variables = (0, _jsutilsKeyMap2['default'])((0, _analyzer.extractVariablesFromObjectValues)([conditionAST]), function (variable) {
    return variable;
  });

  return args.filter(function (arg) {
    return !variables[arg.name];
  }).map(function (arg) {
    return (0, _utils.error)(_templateObject, key, target, arg.name, loc);
  });
};
exports.NoUnusedArguments = NoUnusedArguments;