'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeNamedOrderEnums = MakeNamedOrderEnums;

var _ast = require('../../ast');

function MakeNamedOrderEnums(accumulator, context) {
  var schema = context.schema;

  return _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (type) {
    return type.kind === 'order' && type.expressions.length;
  }).map(function (order) {
    return (0, _ast.makeEnum)(order.isNodeList || order.isScalarList || order.isObjectList ? '_' + (order.type || '') + '_ListOrderKeys' : '_' + (order.type || '') + '_' + (order.edgeType || '') + '_ConnectionOrderKeys', (order.expressions || []).map(function (c) {
      return c.key;
    }));
  });
}