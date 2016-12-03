'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ObjectConnection = ObjectConnection;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _Connection = require('./Connection');

var _common = require('../common');

function ObjectConnection(_ref) {
  var schema = _ref.schema;
  var node = _ref.node;
  var edge = _ref.edge;
  var field = _ref.field;
  var aggFieldDefinitions = _ref.aggFieldDefinitions;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;
  var orderInputObjectDefinition = _ref.orderInputObjectDefinition;

  var type = schema[node];
  (0, _jsutilsInvariant2['default'])(type, 'node must be passed to resolver');

  var InitialStages = function InitialStages(id) {
    return [{ $match: { nodeId: id, nodeField: field } }, {
      $project: {
        _id: false,
        edgeProps: true,
        node: '$relatedObject'
      }
    }];
  };
  var collection = _common.EDGE_COLLECTION;
  var kind = 'ObjectConnection';

  return (0, _Connection.Connection)({
    schema: schema,
    kind: kind,
    node: node,
    edge: edge,
    InitialStages: InitialStages,
    collection: collection,
    aggFieldDefinitions: aggFieldDefinitions,
    filterInputObjectDefinition: filterInputObjectDefinition,
    orderInputObjectDefinition: orderInputObjectDefinition });
}