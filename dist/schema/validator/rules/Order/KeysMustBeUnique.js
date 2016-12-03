'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order on ', ' defines "', '" key multiple times.\n                    ~ Order expression keys must be unique. ', ''], ['Order on ', ' defines "', '" key multiple times.\n                    ~ Order expression keys must be unique. ', '']);

var _utils = require('../../utils');

var KeysMustBeUnique = function KeysMustBeUnique(_ref) {
  var order = _ref.order;

  if (!order) {
    throw Error('context not passed to rule.');
  }
  var name = order.name;
  var expressions = order.expressions;
  var loc = order.loc;

  var target = name.replace('Order#', '');

  var count = expressions.reduce(function (acc, expression) {
    return _extends({}, acc, _defineProperty({}, expression.key, (acc[expression.key] || 0) + 1));
  }, {});

  return _Object$keys(count).filter(function (key) {
    return count[key] > 1;
  }).map(function (key) {
    return (0, _utils.error)(_templateObject, target, key, loc);
  });
};
exports.KeysMustBeUnique = KeysMustBeUnique;