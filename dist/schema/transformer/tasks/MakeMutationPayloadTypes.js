'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeMutationPayloadTypes = MakeMutationPayloadTypes;

var _jsutilsCasing = require('../../../jsutils/casing');

var _ast = require('../../ast');

function MakeMutationPayloadTypes(accumulator) {
  return accumulator.mutations.map(function (mutation) {
    var payloadTypeName = (0, _jsutilsCasing.sentenceCase)(mutation.name) + 'Payload';
    var hasClientMutationId = mutation.fieldASTs.filter(function (field) {
      return field.name.value === 'clientMutationId';
    }).length > 0;
    var interfaces = [];
    var fields = [].concat(_toConsumableArray(mutation.fieldASTs), _toConsumableArray(!hasClientMutationId ? [(0, _ast.makeRequiredField)('clientMutationId', [], 'String')] : []));
    return (0, _ast.makeType)(payloadTypeName, interfaces, fields);
  });
}