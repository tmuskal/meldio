'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeBasicEnums = MakeBasicEnums;

var _ast = require('../../ast');

function MakeBasicEnums() {
  return [(0, _ast.makeEnum)('_NodeValue', ['value']), (0, _ast.makeEnum)('_NumericAggregate', ['SUM', 'COUNT', 'MIN', 'MAX', 'AVERAGE']), (0, _ast.makeEnum)('_Order', ['ASCENDING', 'DESCENDING'])];
}