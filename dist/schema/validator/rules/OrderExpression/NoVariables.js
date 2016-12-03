'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order key "', '" of order on ', ' contains\n        ~ ', ' variable reference(s).\n        ~ Variables are not supported in order expressions. ', ''], ['Order key "', '" of order on ', ' contains\n        ~ ', ' variable reference(s).\n        ~ Variables are not supported in order expressions. ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var NoVariables = function NoVariables(_ref) {
  var order = _ref.order;
  var expression = _ref.expression;

  if (!order || !expression) {
    throw Error('context not passed to rule.');
  }
  var name = order.name;

  var target = name.replace('Order#', '');
  var key = expression.key;
  var expressionASTs = expression.expressionASTs;
  var loc = expression.loc;

  var variables = (0, _analyzer.extractVariablesFromObjectValues)(expressionASTs);

  if (variables.length) {
    return (0, _utils.error)(_templateObject, key, target, variables.map(function (s) {
      return '"' + s + '"';
    }).join(', '), loc);
  }
};
exports.NoVariables = NoVariables;