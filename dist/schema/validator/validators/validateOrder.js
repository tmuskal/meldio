'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateOrder = validateOrder;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateExpressions = require('./validateExpressions');

function validateOrder(order, parentContext, rules) {
  var path = '/order';
  var context = _extends({}, parentContext, { order: order });
  return (0, _jsutilsFlatten22['default'])((rules[path] || []).map(function (rule) {
    return rule(context) || [];
  })).concat((0, _validateExpressions.validateExpressions)(order.expressions, context, path, rules));
}