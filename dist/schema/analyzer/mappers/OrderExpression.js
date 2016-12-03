'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.OrderExpression = OrderExpression;

function OrderExpression(context) {

  return function (expression) {
    return _extends({
      kind: 'order-expression'
    }, !context.noLocation && expression.loc ? {
      loc: {
        kind: 'location',
        start: expression.loc.start,
        end: expression.loc.end } } : {}, {
      key: expression.key.name.value,
      expressionASTs: expression.expression
    });
  };
}