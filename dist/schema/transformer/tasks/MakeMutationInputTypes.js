'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeMutationInputTypes = MakeMutationInputTypes;

var _jsutilsCasing = require('../../../jsutils/casing');

var _ast = require('../../ast');

function MakeMutationInputTypes(accumulator) {
  return accumulator.mutations.map(function (mutation) {
    var inputObjectName = (0, _jsutilsCasing.sentenceCase)(mutation.name) + 'Input';
    var hasClientMutationId = mutation.argumentASTs.filter(function (arg) {
      return arg.name.value === 'clientMutationId';
    }).length > 0;
    var fields = [].concat(_toConsumableArray(mutation.argumentASTs), _toConsumableArray(!hasClientMutationId ? [(0, _ast.makeRequiredInput)('clientMutationId', 'String')] : []));
    return (0, _ast.makeInputObject)(inputObjectName, fields);
  });
}