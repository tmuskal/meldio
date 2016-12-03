'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeRootMutationsType = MakeRootMutationsType;

var _jsutilsCasing = require('../../../jsutils/casing');

var _ast = require('../../ast');

function MakeRootMutationsType(accumulator) {
  var fields = accumulator.mutations.map(function (mutation) {
    return (0, _ast.makeField)(mutation.name, [(0, _ast.makeRequiredInput)('input', (0, _jsutilsCasing.sentenceCase)(mutation.name) + 'Input')], (0, _jsutilsCasing.sentenceCase)(mutation.name) + 'Payload');
  });
  var interfaces = [];

  return fields.length ? [(0, _ast.makeType)('_Mutations', interfaces, fields)] : [];
}