'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeNodeInterface = MakeNodeInterface;

var _ast = require('../../ast');

function MakeNodeInterface() {
  var fields = [(0, _ast.makeRequiredField)('id', [], 'ID')];
  return [(0, _ast.makeInterface)('Node', fields)];
}