'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ConnectionField = ConnectionField;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _connection = require('../connection');

function ConnectionField(_ref) {
  var schema = _ref.schema;
  var node = _ref.node;
  var aggFieldDefinitions = _ref.aggFieldDefinitions;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;
  var orderInputObjectDefinition = _ref.orderInputObjectDefinition;

  var type = schema[node];
  (0, _jsutilsInvariant2['default'])(type && type.kind === 'type', 'node must be passed to resolver');

  var InitialStages = function InitialStages() {
    return [{
      $project: {
        _id: false,
        node: '$$ROOT',
        __encodedNodeType: { $substr: ['$_id', 21, -1] }
      }
    }, { $match: { node: { $ne: null } } }];
  };
  var collection = type.name;
  var kind = 'NodeConnection';

  return (0, _connection.Connection)({
    schema: schema,
    kind: kind,
    node: node,
    InitialStages: InitialStages,
    collection: collection,
    aggFieldDefinitions: aggFieldDefinitions,
    filterInputObjectDefinition: filterInputObjectDefinition,
    orderInputObjectDefinition: orderInputObjectDefinition });
}