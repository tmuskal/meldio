'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ConnectionOrder = ConnectionOrder;

var _schemaAnalyzer = require('../../../schema/analyzer');

function ConnectionOrder(context) {
  var schema = context.schema;
  var edge = context.edge;
  var node = context.node;

  var nodeIsScalar = _schemaAnalyzer.SCALAR_TYPES.includes(node) || schema[node] && schema[node].kind === 'enum';

  var edgeHasScalarFields = schema[edge] && schema[edge].fields && schema[edge].fields.some(function (f) {
    return f.isScalar;
  });

  if (nodeIsScalar && !edgeHasScalarFields) {
    return function (order) {
      return order && order.node ? { node: direction(order.node) } : {};
    };
  }

  if (nodeIsScalar && edgeHasScalarFields) {
    return function (order) {
      return order.map(function (o) {
        return _extends({}, o.node ? { node: direction(o.node) } : {}, objectOrder(o, edge, 'edgeProps'));
      }).reduce(function (acc, o) {
        return _extends({}, acc, o);
      }, {});
    };
  }

  return function (order) {
    return order.map(function (o) {
      return _extends({}, objectOrder(o.node, node, 'node'), objectOrder(o, edge, 'edgeProps'));
    }).reduce(function (acc, o) {
      return _extends({}, acc, o);
    }, {});
  };

  function objectOrder(order, typeName, parentPath) {
    // istanbul ignore if
    if (!typeName || !schema[typeName] || !order) {
      return {};
    }

    var type = schema[typeName];
    var idPath = parentPath ? parentPath + '._id' : '_id';

    if (type.kind === 'type' && type.implementsNode) {
      return _extends({}, order.id ? _defineProperty({}, idPath, direction(order.id)) : {}, fieldsOrder(_extends({}, order, { id: undefined }), type.fields, parentPath));
    } else if (type.kind === 'type') {
      return fieldsOrder(order, type.fields, parentPath);
    } else if (type.kind === 'union' && type.everyTypeImplementsNode) {
      return _extends({}, order.id ? _defineProperty({}, idPath, direction(order.id)) : {});
    } else if (type.kind === 'union') {
      // istanbul ignore next
      return {};
    } else if (type.kind === 'interface' && type.everyTypeImplementsNode) {
      return _extends({}, order.id ? _defineProperty({}, idPath, direction(order.id)) : {}, fieldsOrder(_extends({}, order, { id: undefined }), type.fields, parentPath));
    } else if (type.kind === 'interface') {
      return fieldsOrder(order, type.fields, parentPath);
    }
    // istanbul ignore next
    return {};
  }

  function fieldsOrder(order, fields, parentPath) {
    return fields.filter(function (field) {
      return field.isScalar && order[field.name];
    }).map(function (field) {
      return _defineProperty({}, parentPath ? parentPath + '.' + field.name : field.name, direction(order[field.name]));
    }).reduce(function (acc, fld) {
      return _extends({}, acc, fld);
    }, {});
  }

  function direction(order) {
    return order === 'ASCENDING' ? 1 : -1;
  }
}