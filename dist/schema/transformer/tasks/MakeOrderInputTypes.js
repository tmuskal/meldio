'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeOrderInputTypes = MakeOrderInputTypes;

var _ast = require('../../ast');

var _analyzer = require('../../analyzer');

function MakeOrderInputTypes(accumulator, context) {
  var schema = context.schema;
  var connections = context.connections;
  var lists = context.lists;

  var orders = {};

  var hasScalarFields = function hasScalarFields(typeName) {
    var type = schema[typeName];
    return type && (type.kind === 'type' || type.kind === 'interface') && type.fields.some(function (f) {
      return f.isScalar;
    });
  };

  var makeFieldOrders = function makeFieldOrders(fields) {
    return fields.filter(function (field) {
      return field.isScalar;
    }).map(function (field) {
      return (0, _ast.makeInput)(field.name, '_Order');
    });
  };

  var makeTypeOrder = function makeTypeOrder(typeName) {
    if (orders[typeName] || _analyzer.SCALAR_TYPES.includes(typeName) || schema[typeName] && schema[typeName].kind === 'enum') {
      return;
    }

    if (schema[typeName] && schema[typeName].kind === 'union') {
      var isNode = schema[typeName].everyTypeImplementsNode;

      orders[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Order', [].concat(_toConsumableArray(isNode ? [(0, _ast.makeInput)('id', '_Order')] : [])));
    } else
      // makeInput('type', `_Order`)
      if (schema[typeName] && schema[typeName].kind === 'interface') {
        var isNode = schema[typeName].everyTypeImplementsNode;
        var fields = schema[typeName].fields;

        orders[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Order', [].concat(_toConsumableArray(isNode && !fields.some(function (f) {
          return f.name === 'id';
        }) ? [(0, _ast.makeInput)('id', '_Order')] : []), _toConsumableArray(makeFieldOrders(fields))));
      } else if (schema[typeName] && schema[typeName].kind === 'type') {
        var fields = schema[typeName].fields;

        orders[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Order', makeFieldOrders(fields));
      }
  };

  var makeEdgeOrder = function makeEdgeOrder(kind, typeName, edgeTypeName) {
    var edgeType = schema[edgeTypeName];

    return (0, _ast.makeInputObject)('_' + typeName + '_' + edgeTypeName + '_EdgeOrder', [].concat(_toConsumableArray(edgeType && edgeType.fields ? makeFieldOrders(edgeType.fields) : []), _toConsumableArray(kind === 'ScalarConnection' ? [(0, _ast.makeInput)('node', '_Order')] : kind === 'NodeConnection' ? [(0, _ast.makeInput)('node', '_' + typeName + '_Order')] : kind === 'ObjectConnection' && hasScalarFields(typeName) ? [(0, _ast.makeInput)('node', '_' + typeName + '_Order')] : [])));
  };

  lists.filter(function (list) {
    return list.kind === 'NodeList' || list.kind === 'ObjectList' && hasScalarFields(list.type);
  }).forEach(function (list) {
    if (!orders[list.type]) {
      makeTypeOrder(list.type);
    }
  });

  connections.filter(function (connection) {
    return connection.kind === 'NodeConnection' || connection.kind === 'ObjectConnection' && hasScalarFields(connection.type);
  }).forEach(function (connection) {
    if (!orders[connection.type]) {
      makeTypeOrder(connection.type);
    }
  });

  var edgeOrders = connections.filter(function (connection) {
    return connection.kind !== 'ObjectConnection' || hasScalarFields(connection.type) || hasScalarFields(connection.edgeType);
  }).map(function (connection) {
    return makeEdgeOrder(connection.kind, connection.type, connection.edgeType);
  });

  return [].concat(_toConsumableArray(edgeOrders), _toConsumableArray(_Object$keys(orders).map(function (key) {
    return orders[key];
  })));
}

// makeInput('type', `_Order`),