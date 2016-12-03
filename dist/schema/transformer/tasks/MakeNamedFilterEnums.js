'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeNamedFilterEnums = MakeNamedFilterEnums;

var _ast = require('../../ast');

function MakeNamedFilterEnums(accumulator, context) {
  var schema = context.schema;

  return _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (type) {
    return type.kind === 'filter' && type.conditions.length;
  }).map(function (filter) {
    return (0, _ast.makeEnum)(filter.isNodeList || filter.isScalarList || filter.isObjectList ? '_' + (filter.type || '') + '_ListFilterKeys' : '_' + (filter.type || '') + '_' + (filter.edgeType || '') + '_ConnectionFilterKeys', (filter.conditions || []).map(function (c) {
      return c.key;
    }));
  });
}