'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter key "', '" of filter on ', ' should be in\n                 ~ "CAPITAL_CASE", like this: "', '". ', ''], ['Filter key "', '" of filter on ', ' should be in\n                 ~ "CAPITAL_CASE", like this: "', '". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var KeyInCapitalCase = function KeyInCapitalCase(_ref) {
  var filter = _ref.filter;
  var condition = _ref.condition;

  if (!filter || !condition) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;

  var target = name.replace('Filter#', '');
  var key = condition.key;
  var loc = condition.loc;

  if (key !== (0, _jsutilsCasing.capitalCase)(key)) {
    return (0, _utils.warning)(_templateObject, key, target, (0, _jsutilsCasing.capitalCase)(key), loc);
  }
};
exports.KeyInCapitalCase = KeyInCapitalCase;