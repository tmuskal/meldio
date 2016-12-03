'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeConnection = NodeConnection;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _Connection = require('./Connection');

var _common = require('../common');

function NodeConnection(_ref) {
  var schema = _ref.schema;
  var node = _ref.node;
  var edge = _ref.edge;
  var field = _ref.field;
  var aggFieldDefinitions = _ref.aggFieldDefinitions;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;
  var orderInputObjectDefinition = _ref.orderInputObjectDefinition;

  var type = schema[node];
  (0, _jsutilsInvariant2['default'])(type, 'node must be passed to resolver');

  var typeNames = type.kind === 'type' ? [type.name] : type.kind === 'union' ? type.typeNames : type.kind === 'interface' ? type.implementations : [];
  (0, _jsutilsInvariant2['default'])(typeNames.length, 'union or interface must have implementations');

  var InitialStages = function InitialStages(id) {
    return [{
      $match: {
        $or: [{ nodeId: id, nodeField: field }, { relatedId: id, relatedField: field }]
      }
    }, {
      $project: {
        edgeProps: true,
        joinId: { $cond: {
            'if': { $eq: ['$nodeId', id] },
            then: '$relatedId',
            'else': '$nodeId' } },
        __encodedNodeType: { $substr: [{ $cond: {
              'if': { $eq: ['$nodeId', id] },
              then: '$relatedId',
              'else': '$nodeId' } }, 21, -1] }
      }
    }].concat(_toConsumableArray(typeNames.map(function (typeName) {
      return {
        $lookup: {
          from: typeName,
          localField: 'joinId',
          foreignField: '_id',
          as: typeName
        } };
    })), [{
      $project: {
        _id: false,
        edgeProps: true,
        __nodeType: true,
        node: {
          $arrayElemAt: [{ $concatArrays: typeNames.map(function (tn) {
              return '$' + tn;
            }) }, 0]
        }
      }
    }, {
      $match: { node: { $ne: null } }
    }]);
  };
  var collection = _common.EDGE_COLLECTION;
  var kind = 'NodeConnection';

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