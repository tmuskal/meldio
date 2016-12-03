'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order key "', '" of order on ', ' should be in\n                 ~ "CAPITAL_CASE", like this: "', '". ', ''], ['Order key "', '" of order on ', ' should be in\n                 ~ "CAPITAL_CASE", like this: "', '". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var KeyInCapitalCase = function KeyInCapitalCase(_ref) {
  var order = _ref.order;
  var expression = _ref.expression;

  if (!order || !expression) {
    throw Error('context not passed to rule.');
  }
  var name = order.name;

  var target = name.replace('Order#', '');
  var key = expression.key;
  var loc = expression.loc;

  if (key !== (0, _jsutilsCasing.capitalCase)(key)) {
    return (0, _utils.warning)(_templateObject, key, target, (0, _jsutilsCasing.capitalCase)(key), loc);
  }
};
exports.KeyInCapitalCase = KeyInCapitalCase;